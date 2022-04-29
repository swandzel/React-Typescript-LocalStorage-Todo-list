import { AddTodoProps } from "../interfaces";

const AddTodo = ({
  newTodo,
  setNewTodo,
  addTodo,
}: AddTodoProps): JSX.Element => {
  return (
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
  );
};

export default AddTodo;
