import { FC } from "react";
import "./Calendar.css";
import { useCalendar } from "../../hooks";
import CalendarDay from "./CalendarDay";
import CalendarMonthes from "./CalendarMonth";
import { formatDate } from "../../utis/date/formatDate";
import CalendarYear from "./CalendarYear";

interface ICalendarProps {
  locale?: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  firstWeekDay?: number;
}

export const Calendar: FC<ICalendarProps> = ({
  locale,
  selectedDate,
  setSelectedDate,
}) => {
  const { state, functions } = useCalendar({
    firstWeekDay: 2,
    locale,
    date: selectedDate,
  });

  return (
    <div className="calendar">
      {state.mode === "days" && (
        <div className="calendar__current">
          <span>{formatDate(new Date(), "DD MM YYYY")}</span>
          <span>selected: {formatDate(selectedDate, "DD MM YYYY")}</span>
        </div>
      )}
      <div className="calendar__header">
        <div
          onClick={() => functions.onClickArrow("left")}
          className="calendar__header__arrow__left"
        />
        {state.mode === "days" && (
          <div
            className="calendar__header__text"
            onClick={() => functions.setMode("monthes")}
          >
            {state.monthDaysNames[state.selectedMonth.monthIndex].month}{" "}
            {state.selectedYear}
          </div>
        )}
        {state.mode === "monthes" && (
          <div
            className="calendar__header__text"
            onClick={() => functions.setMode("years")}
          >
            {state.selectedYear}
          </div>
        )}
        {state.mode === "years" && (
          <div
            className="calendar__header__text"
            onClick={() => functions.setMode("days")}
          >
            {state.selectedYearsInterval[0]} -{" "}
            {
              state.selectedYearsInterval[
                state.selectedYearsInterval.length - 1
              ]
            }
          </div>
        )}
        <div
          onClick={() => functions.onClickArrow("right")}
          className="calendar__header__arrow__right"
        />
      </div>
      <div className="calendar__body">
        {state.mode === "days" && (
          <>
            <div className="calendar__week__names">
              {state.weekDaysNames.map((day) => (
                <div className="calendar__week__name" key={day.dayShort}>
                  {day.dayShort}
                </div>
              ))}
            </div>
            <div className="calendar__days">
              {state.calendarDays.map((day) => (
                <CalendarDay
                  onClick={() => {
                    setSelectedDate(day.date);
                    functions.setSelectedDate(day);
                  }}
                  dayNumber={day.dayNumber}
                  monthIndex={state.selectedMonth.monthIndex}
                  selectedDate={state.selectedDate.date}
                  key={day.timestamp}
                  day={day.date}
                  currentMonthIndex={day.monthIndex}
                />
              ))}
            </div>
          </>
        )}

        <>
          {state.mode === "monthes" && (
            <div className="calendar__monthes">
              {state.monthDaysNames.map((month) => (
                <CalendarMonthes
                  onClick={() => {
                    functions.setMode("days");
                    functions.selectMonthById(month.monthIndex);
                  }}
                  isCurrentMonth={
                    new Date().getMonth() === month.monthIndex &&
                    new Date().getFullYear() === state.selectedYear
                  }
                  isSelectedMonth={
                    month.monthIndex === state.selectedMonth.monthIndex
                  }
                  key={month.monthIndex}
                  value={month.monthShort}
                />
              ))}
            </div>
          )}
        </>

        <>
          {state.mode === "years" && (
            <div className="calendar__monthes">
              {state.selectedYearsInterval.map((year) => (
                <CalendarYear
                  key={year}
                  isCurrent={new Date().getFullYear() === year}
                  isSelected={year === state.selectedYear}
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode("monthes");
                  }}
                  value={year}
                />
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
};
