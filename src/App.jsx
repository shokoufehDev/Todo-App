import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]); 
  const [inputValue, setInputValue] = useState(""); 
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (storedTasks && Array.isArray(storedTasks)) {
      setTasks(storedTasks); 
    }
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
  }, []);


  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);


  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, { text: inputValue, id: Date.now(), completed: false }]);
      setInputValue("");
    }
  };

  
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    if (updatedTasks.length === 0) {
      localStorage.removeItem("tasks"); 
    }
  };

  
  const markAsDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div className="App">
      <h1>Todo List</h1>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>{task.text}</span>
            <div>
              <button
                className="done-button"
                onClick={() => markAsDone(task.id)}
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
