import { createDate } from "./createDate"

export const getWeekDaysNames = (firstWeekDay: number, locale: string = 'default') => {
    const weekDaysNames: {
        dayLong: ReturnType<typeof createDate>['dayLong']
        dayShort: ReturnType<typeof createDate>['dayShort']
    }[] = Array.from({length: 7})

    const date = new Date()

    weekDaysNames.forEach((_, i) => {
        const {dayLong, dayNumberInWeek, dayShort} = createDate({locale, date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)})

        weekDaysNames[dayNumberInWeek - 1] = {dayLong, dayShort}
    })

    return [...weekDaysNames.slice(firstWeekDay - 1), ...weekDaysNames.slice(0, firstWeekDay - 1)]
}