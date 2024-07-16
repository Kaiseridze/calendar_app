import { useMemo, useState } from "react";
import {
  createDate,
  createMonth,
  getMonthNumberOfDays,
  getWeekDaysNames,
} from "../utis";
import { getMonthNames } from "../utis/date/getMonthNames";

interface IUseCalendarProps {
  locale?: string;
  date: Date;
  firstWeekDay?: number;
}

export const useCalendar = ({
  firstWeekDay = 2,
  locale = "default",
  date,
}: IUseCalendarProps) => {
  const [mode, setMode] = useState<"days" | "monthes" | "years">("days");
  const [selectedDate, setSelectedDate] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDate.year, selectedDate.monthIndex),
      locale: locale,
    })
  );

  const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10;
    return [...Array(10)].map((_, index) => {
      return startYear + index;
    });
  };

  const [selectedYear, setSelectedYear] = useState(selectedDate.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = useState(
    getYearsInterval(selectedDate.year)
  );
  const monthDaysNames = useMemo(() => getMonthNames(locale), []);

  const weekDaysNames = useMemo(
    () => getWeekDaysNames(firstWeekDay, locale),
    []
  );
  const days = useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear]
  );

  const onClickArrow = (direction: "right" | "left") => {
    if (mode === "years" && direction === "left") {
      return setSelectedYearsInterval(
        getYearsInterval(selectedYearsInterval[0] - 10)
      );
    }

    if (mode === "years" && direction === "right") {
      return setSelectedYearsInterval(
        getYearsInterval(selectedYearsInterval[0] + 10)
      );
    }

    if (mode === "monthes" && direction === "left") {
      const year = selectedYear - 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear - 1);
    }

    if (mode === "monthes" && direction === "right") {
      const year = selectedYear + 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear + 1);
    }

    if (mode === "days") {
      const monthIndex =
        direction === "left"
          ? selectedMonth.monthIndex - 1
          : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year))
          setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(
          createMonth({ date: new Date(selectedYear - 1, 11), locale })
        );
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year))
          setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(
          createMonth({ date: new Date(year, 0), locale })
        );
      }

      setSelectedMonth(
        createMonth({ date: new Date(selectedYear, monthIndex), locale })
      );
    }
  };

  const selectMonthById = (monthIndex: number) => {
    setSelectedMonth(createMonth({date: new Date(selectedYear, monthIndex), locale}))
  }

  const calendarDays = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear
    );

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDayOfMonths = days[0];
    const lastDayOfMonths = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDay - 1;

    const numberOfPrevDays =
      firstDayOfMonths.dayNumberInWeek - 1 - shiftIndex < 0
        ? 7 - (firstWeekDay - firstDayOfMonths.dayNumberInWeek)
        : firstDayOfMonths.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      7 - lastDayOfMonths?.dayNumberInWeek + shiftIndex > 6
        ? 7 - lastDayOfMonths?.dayNumberInWeek - (7 - shiftIndex)
        : 7 - lastDayOfMonths?.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i += 1
    ) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }
    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);
  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthDaysNames,
      selectedDate,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
    },
    functions: {
      setMode,
      setSelectedDate,
      onClickArrow,
      selectMonthById,
      setSelectedYear
    },
  };
};
