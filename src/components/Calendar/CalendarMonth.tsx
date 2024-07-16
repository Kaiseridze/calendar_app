import { FC } from "react";

interface ICalendarMonthProps {
  value: string;
  isCurrentMonth: boolean;
  isSelectedMonth: boolean;
  onClick: () => void
}

const CalendarMonth: FC<ICalendarMonthProps> = ({
  value,
  isCurrentMonth,
  isSelectedMonth,
  onClick
}) => {
  return (
    <div
    onClick={onClick}
      className={[
        "calendar__monthes__item",
        isCurrentMonth ? "calendar__monthes__current" : "",
        isSelectedMonth ? "calendar__selected__item" : "",
      ].join(" ")}
    >
      {value}
    </div>
  );
};

export default CalendarMonth;
