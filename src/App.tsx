import { useState, useEffect } from "react";
import "./App.css";
import AddTodo from "./component/AddTodo";
import Todo from "./component/Todo";
import { TodoObject } from "./interfaces";

const App = (): JSX.Element => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoObject[]>([]);
  const [disableDelete, setDisableDelete] = useState<boolean>(false);

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    if (todosFromLocalStorage) {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, { text: newTodo }]);
      setNewTodo("");
      addToLocalStorage([...todos, { text: newTodo }]);
    }
  };

  const removeTodo = (index: number) => {
    if (!disableDelete) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      addToLocalStorage(newTodos);
    }
  };

  const addToLocalStorage = (todos: TodoObject[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="todo-title">
          You have {todos.length} task{todos.length === 1 ? "" : "s"} to do
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
        <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
