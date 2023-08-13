"use client";

import { useTodoContext } from "../context/TodoContext";
interface Todo {
  title: string;
  _id: number;
}

interface TodoItemProps {
  todo: Todo;
  todos: Todo[];
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { deleteTodo, editTodo, inputRef } = useTodoContext();
  const { title, _id } = todo;
  const handleDelete = (id: number) => {
    deleteTodo(id);
  };
  const handleEdit = (id: number) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
          onClick={() => handleEdit(_id)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 mx-3 text-sm bg-red-500 text-white rounded"
          onClick={() => handleDelete(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
