import { getWeekNumber } from "./getWeekNumber";

interface IGetDateProps {
  locale?: string;
  date?: Date;
}

export const createDate = (params?: IGetDateProps) => {
  const locale = params?.locale ?? "default";

  const date = params?.date ?? new Date();
  const dayNumber = date.getDate();
  const dayLong = date.toLocaleDateString(locale, { weekday: "long" });
  const dayNumberInWeek = date.getDay() + 1;
  const dayShort = date.toLocaleDateString(locale, {weekday: 'short'})

  const year = date.getFullYear()
  const yearShort = date.toLocaleDateString(locale, {year: "2-digit"})

  const month = date.toLocaleDateString(locale, {month: "long"})
  const monthShort = date.toLocaleDateString(locale, {month: "short"})
  const monthIndex = date.getMonth()
  const monthNumber = date.getMonth() + 1

  const timestamp = date.getTime();
  const week = getWeekNumber(date)
  return {
    timestamp,
    date,
    dayLong,
    dayNumber,
    dayNumberInWeek,
    dayShort,

    week,

    month,
    monthShort,
    monthIndex,
    monthNumber,
    
    year,
    yearShort
  };
};
