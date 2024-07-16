import { createDate } from './createDate';

export const formatDate = (date: Date, format: string) => {
  const currentDate = createDate({ date });

  return format
    .replace(/\bYYYY\b/, currentDate.year.toString())
    .replace(/\bYYY\b/, currentDate.yearShort)
    .replace(/\bWW\b/, currentDate.week.toString().padStart(2, '0'))
    .replace(/\bW\b/, currentDate.week.toString())
    .replace(/\bDDDD\b/, currentDate.dayLong)
    .replace(/\bDDD\b/, currentDate.dayShort)
    .replace(/\bDD\b/, currentDate.dayNumber.toString().padStart(2, '0'))
    .replace(/\bD\b/, currentDate.dayNumber.toString())
    .replace(/\bMMMM\b/, currentDate.month)
    .replace(/\bMMM\b/, currentDate.monthShort)
    .replace(/\bMM\b/, currentDate.monthNumber.toString().padStart(2, '0'))
    .replace(/\bM\b/, currentDate.monthNumber.toString());
};