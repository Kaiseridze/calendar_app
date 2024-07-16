import { checkIsDatesAreEqual } from "./checkIsDatesAreEqual"

export const checkIsToday = (date: Date) => {
    const today = new Date();
    return checkIsDatesAreEqual(today, date)
    
}