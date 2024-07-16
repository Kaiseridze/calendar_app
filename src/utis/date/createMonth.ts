import { createDate } from "./createDate";
import { getMonthNumberOfDays } from "./getMonthNumberOfDays";

interface ICreateMonthProps{
    date?: Date,
    locale?: string
}

export const createMonth = (params?: ICreateMonthProps) => {
    const locale = params?.locale ?? 'default'
    const date = params?.date ?? new Date();

    const createdDate = createDate({locale, date})
    const {month, monthNumber, monthIndex, year} = createdDate
    const getDay = (dayNumber: number) => {
        return createDate({date: new Date(year, monthIndex, dayNumber), locale})
    }
    const createMonthDays = () => {
        const days = [];

        for(let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i++){
            days[i] = getDay(i + 1)
        }
        return days
    }
    return {
        getDay,
        month,
        monthNumber,
        monthIndex,
        year,
        createMonthDays
    }
}