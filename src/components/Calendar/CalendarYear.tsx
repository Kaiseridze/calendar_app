import { FC } from "react";

interface ICalendarProps {
  value: number;
  onClick: () => void;
  isSelected: boolean;
  isCurrent: boolean;
}

const CalendarYear: FC<ICalendarProps> = ({
  value,
  onClick,
  isSelected,
  isCurrent,
}) => {
  return (
    <div
      className={[
        "calendar__year__item",
        isCurrent ? "calendar__years__current" : "",
        isSelected ? "calendar__selected__item" : "",
      ].join(" ")}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default CalendarYear;
