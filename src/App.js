
import './App.css';
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
   
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
   
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay()];
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>Task Master</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2 className="subHeading">Embrace the power of {currentDay}! ⚡️</h2>
      </div>
      <div className="clock">
        <p>{currentTime}</p>
      </div>
      <div className="input">
        <input
          value={todo}
          onChange={(evt) => setTodo(evt.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() =>
            setTodos([...todos, { id: Date.now(), text: todo, status: false }])
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {todos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(evt) => {
                    setTodos(
                      todos.filter((obj2) => {
                        if (obj.id === obj2.id) {
                          obj2.status = evt.target.checked;
                        }
                        return obj2;
                      })
                    );
                  }}
                  checked={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
       <p className={obj.status ? 'strikethrough' : ''}
   style={obj.status ? { textDecoration: 'line-through' } : {}}>
  {obj.text}
</p>

              </div>
              <i
                onClick={() => {
                  setTodos(
                    todos.filter((item) => {
                      return obj.id !== item.id;
                    })
                  );
                }}
                className="fas fa-times"
              ></i>
            </div>
          );
        })}
        <div className="completed">
          <p style={{ textAlign: "center", color: "green" }}>Completed</p>
          {todos.map((obj) => {
            if (obj.status) {
              return <h4 style={{ background: "white" }}>{obj.text}</h4>;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}


export default App;

