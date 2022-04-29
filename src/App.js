import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./component/Todo";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [disableDelete, setDisableDelete] = useState(false);

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem("todos"));
  //   if (storedTodos) setTodos(storedTodos);
  // }, []);

  // saving the todos in browser storage to prevent loss of todos on refreshing tab
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  // useEffect(() => {
  //   addToLocalStorage(todos);
  // }, [todos]);

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    console.log(todosFromLocalStorage);
    if (todosFromLocalStorage) {
      setTodos(JSON.parse(todosFromLocalStorage));
    } else {
      return [];
    }
  }, []);

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, { text: newTodo }]);
      setNewTodo("");
      addToLocalStorage([...todos, { text: newTodo }]);
    }
  };

  const removeTodo = (index) => {
    if (!disableDelete) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      addToLocalStorage(newTodos);
    }
  };

  const addToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="todo-title">
          You have {todos.length} task{todos.length == 1 ? "" : "s"} to do
        </div>
        <div className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              removeTodo={removeTodo}
              key={index}
              index={index}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              setDisableDelete={setDisableDelete}
              addToLocalStorage={addToLocalStorage}
            />
          ))}
        </div>
        <div className="todo-add">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            type="text"
          />
          <button type="submit" onClick={addTodo}>
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
