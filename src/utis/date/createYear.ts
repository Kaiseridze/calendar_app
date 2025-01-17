import { createDate } from "./createDate";
import { createMonth } from "./createMonth";

interface ICreateYearProps {
  locale?: string;
  monthNumber?: number;
  year?: number;
}

export const createYear = (params?: ICreateYearProps) => {
  const monthCount = 12;
  const today = createDate();

  const locale = params?.locale ?? "default";
  const year = params?.year ?? today.year;
  const monthNumber = params?.monthNumber ?? today.monthNumber;

  const month = createMonth({
    date: new Date(year, monthNumber - 1),
    locale: locale,
  });

  const getMonthDays = (monthIndex: number) => {
    return createMonth({date: new Date(year, monthIndex), locale}).createMonthDays()
  }

  const createYearMonthes = () => {
    const monthes = []

    for(let i = 0; i <= monthCount - 1; i++){
        monthes[i] = getMonthDays(i)
    }
    return monthes
  }

  return {
    month,
    year,
    createYearMonthes
  }

};
