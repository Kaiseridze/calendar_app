import { useState } from "react";
import { TasksProvider } from "./context/Tasks.context";
import "./App.css";
import { Calendar } from "./components";


const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (

      <TasksProvider>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </TasksProvider>

  );
};

export default App;
