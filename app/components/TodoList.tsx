"use client";

import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";

const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <div className="m-10 mt-5 w-[80%]">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} todos={todos} />
      ))}
    </div>
  );
};

export default TodoList;
