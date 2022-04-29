import React, { useState } from "react";

function Todo({
  removeTodo,
  index,
  todo,
  todos,
  setTodos,
  setDisableDelete,
  addToLocalStorage,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  const handleEdit = (e, index) => {
    setDisableDelete(false);
    e.preventDefault();
    if (editTodo) {
      const editedTodo = todos.map((todo, idx) =>
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
}

export default Todo;
