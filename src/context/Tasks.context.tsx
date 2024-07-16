import React, { createContext, useState, FC, ReactNode } from "react";

export interface ITasksProps {
  id: string;
  date: string;
  title: string;
  checked: boolean;
}

export interface ITasksContextProps {
  tasks: ITasksProps[];
  setTasks: React.Dispatch<React.SetStateAction<ITasksProps[]>>;
  addTask: (task: ITasksProps) => void;
  updateTask: (id: string, updatedTask: Partial<ITasksProps>) => void;
  deleteTask: (id: string) => void;
  updateChecked: (id: string) => void;
}

export const TasksContext = createContext<ITasksContextProps | undefined>(
  undefined
);

export const TasksProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITasksProps[]>([]);

  const addTask = (task: ITasksProps) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (id: string, updatedTask: Partial<ITasksProps>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const updateChecked = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        updateChecked,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
