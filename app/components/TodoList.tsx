"use client";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";

const TodoList = () => {
  const { todos, loading } = useTodoContext();
  if (loading) {
    return <div className="p-10 text-xl ">Loading...</div>;
  }

  return (
    <div className="m-10 mt-5 w-[80%]">
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} todos={todos} />
      ))}
    </div>
  );
};

export default TodoList;
