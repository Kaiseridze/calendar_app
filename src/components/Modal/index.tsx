import { Dispatch, FC, SetStateAction } from "react";
import { useTasks } from "../../context/useTasks";
import { formatDate } from "../../utis/date/formatDate";
import "./Modal.css";
import { randomizer } from "../../utis";
import { Task } from "../Task";

interface IModalProps {
  visible: boolean;
  date: Date;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const Modal: FC<IModalProps> = ({ visible, date, setVisible }) => {
  const { tasks, addTask } = useTasks();
  const formattedDate = formatDate(date, "DD-MM-YYYY");
  const currentTasks = tasks.filter((task) => task.date === formattedDate);

  const handleAddTask = () => {
    const newTask = {
      id: randomizer(),
      date: formattedDate,
      title: "New Task",
      checked: false,
    };
    addTask(newTask);
  };
  return (
    <>
      {visible && (
        <div onClick={() => setVisible(false)} className="modal">
          <div onClick={(e) => e.stopPropagation()} className="modal__body">
            {formatDate(date, "DDDD DD MMMM YYYY")}
            <ul>
              {currentTasks?.map((task) => (
                <Task
                  key={task.id}
                  checked={task.checked}
                  title={task.title}
                  id={task.id}
                />
              ))}
            </ul>
            <button onClick={handleAddTask}>Add</button>
          </div>
        </div>
      )}
    </>
  );
};
