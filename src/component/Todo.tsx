import { useState, SyntheticEvent } from "react";
import { TodoObject, TodoProps } from "../interfaces";

const Todo = ({
  removeTodo,
  index,
  todo,
  todos,
  setTodos,
  setDisableDelete,
  addToLocalStorage,
}: TodoProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>("");

  const handleEdit = (e: SyntheticEvent, index: number) => {
    setDisableDelete(false);
    e.preventDefault();
    if (editTodo) {
      const editedTodo = todos.map((todo: TodoObject, idx: number) =>
        idx === index ? { text: editTodo } : todo
      );
      setTodos(editedTodo);
      addToLocalStorage(editedTodo);
    }
    setEditMode(false);
  };

  return (
    <div key={index} className="todo-item">
      {editMode ? (
        <div className="todo-edit">
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            placeholder={todo.text}
          />
          <button
            type="submit"
            className="todo-delete"
            onClick={(e) => handleEdit(e, index)}
          >
            🖫
          </button>
        </div>
      ) : (
        <span>{todo.text}</span>
      )}
      <div className="todo-buttons">
        <button
          type="submit"
          className="todo-delete"
          onClick={() => removeTodo(index)}
        >
          X
        </button>
        <button
          type="submit"
          className="todo-delete"
          onClick={() => {
            if (!editMode) {
              setEditMode(!editMode);
              setDisableDelete(true);
            }
          }}
        >
          ✎
        </button>
      </div>
    </div>
  );
};

export default Todo;
