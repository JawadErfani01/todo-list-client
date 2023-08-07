"use client";
import React from "react";
import { useTodoContext } from "../context/TodoContext";
interface Todo {
  title: string;
  id: number;
}

interface TodoItemProps {
  todo: Todo;
  todos: Todo[];
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, todos }) => {
  const { deleteTodo, editTodo } = useTodoContext();
  const { title, id } = todo;

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };
  const handleEdit = (id: number) => {
    editTodo(id);
  };

  return (
    <div className="px-4 py-3 border text-start flex flex-row justify-between shadow-xl m-3 my-10 w-full">
      <h1 className="text-lg mb-2">
        Title: <span className="opacity-70">{title}</span>
      </h1>
      <div className="flex justify-between">
        <button
          className="px-3 py-1 mx-3 text-sm bg-blue-500 text-white rounded"
          onClick={() => handleEdit(id)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 mx-3 text-sm bg-red-500 text-white rounded"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
