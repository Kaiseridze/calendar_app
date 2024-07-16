import { useContext } from "react";

import { ITasksContextProps, TasksContext } from "./Tasks.context";

export const useTasks = (): ITasksContextProps => {
    const context = useContext(TasksContext);
    if (!context) {
      throw new Error("useTasks must be used within a TasksProvider");
    }
    return context;
  };