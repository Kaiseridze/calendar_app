import { MouseEventHandler, useState } from "react";
import { checkIsDatesAreEqual, checkIsToday } from "../../utis";
import { Modal } from "../Modal";


interface ICalendarDayProps {
  day?: Date;
  month?: string;
  selectedDate: Date;
  dayNumber: number;
  monthIndex: number;
  currentMonthIndex: number;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const CalendarDay = ({
  day = new Date(),
  selectedDate,
  monthIndex,
  currentMonthIndex,
  dayNumber,
  onClick,
  month,
}: ICalendarDayProps) => {
  const [visible, setVisible] = useState(false);

  const onSetVisible = () => {
    setVisible((prev) => !prev);
  };

  const isToday = checkIsToday(day);
  const isSelectedDate = checkIsDatesAreEqual(day, selectedDate);
  const isAdditionalDay = currentMonthIndex !== monthIndex;
  return (
    <>
      <div
        onClick={(e) => {
          onClick(e);
          onSetVisible()
        }}
        className={[
          "calendar__day",
          isToday ? "calendar__today__item" : "",
          isSelectedDate ? "calendar__selected__day" : "",
          isAdditionalDay ? "calendar__additional__day" : "",
        ].join(" ")}
      >
        {dayNumber || month}
      </div>
      <Modal setVisible={setVisible} date={day} visible={visible}/>
    </>
  );
};

export default CalendarDay;
