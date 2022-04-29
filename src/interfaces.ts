import { Dispatch, SetStateAction } from "react";

export interface TodoObject {
  text?: string;
}

export interface AddTodoProps {
  newTodo: string;
  setNewTodo: Dispatch<SetStateAction<string>>;
  addTodo: () => void;
}

export interface TodoProps {
  removeTodo: (index: number) => void;
  index: number;
  todo: TodoObject;
  todos: TodoObject[];
  setTodos: Dispatch<SetStateAction<TodoObject[]>>;
  setDisableDelete: Dispatch<SetStateAction<boolean>>;
  addToLocalStorage: any;
}
