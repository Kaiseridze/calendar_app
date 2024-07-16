import React, { useState } from "react";
import { useTasks } from "../../context/useTasks";
import './Tasks.css'

interface ITaskProps {
  id: string;
  title: string;
  checked: boolean;
}

export const Task = ({ id, title, checked }: ITaskProps) => {
  const { updateChecked } = useTasks();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(title);
  const { deleteTask, updateTask } = useTasks();

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  const handleUpdateTask = (title: string) => {
    updateTask(id, { title });
  };

  const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <li className="task" key={id}>
      {isEdit ? (
        <input onChange={onEdit} type="text" value={newTitle} />
      ) : (
        <>
          <div className="title__holder">
            <span className="title">{title}</span>
            <input
            className="checkbox"
              onChange={() => updateChecked(id)}
              type="checkbox"
              checked={checked}
            />
          </div>
        </>
      )}
      <div className="button__holder">
        <button className="button" onClick={handleDeleteTask}>
          Remove
        </button>
        {isEdit ? (
          <button
            onClick={() => {
              handleUpdateTask(newTitle);
              setIsEdit(false);
            }}
          >
            Submit
          </button>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}
      </div>
    </li>
  );
};
