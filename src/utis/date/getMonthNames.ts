import { createDate } from "./createDate"

export const getMonthNames = (locale: string = 'default') => {
    const monthNames: {
        month: ReturnType<typeof createDate>['month']
        monthShort: ReturnType<typeof createDate>['monthShort']
        monthIndex: ReturnType<typeof createDate>['monthIndex']
        date: ReturnType<typeof createDate>['date']
    }[] = Array.from({length: 12})

    const currentDate = new Date()
    monthNames.forEach((_, i) => {
        const {month, monthIndex, monthShort, date} = createDate({date: new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate()), locale})
        monthNames[monthIndex] = {month, monthIndex, monthShort, date}
    })
    return monthNames
}