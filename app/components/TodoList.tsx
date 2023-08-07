"use client";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../store/TodoContext";
interface TodoProps {
  title: string;
  id: number;
}

export const Data: TodoProps[] = [
  { title: "go to park", id: 1 },
  { title: "learn JavaScript", id: 2 },
  { title: "Exercise English", id: 3 },
];

const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <div className="m-10 w-[80%]">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} todos={todos} />
      ))}
    </div>
  );
};

export default TodoList;
