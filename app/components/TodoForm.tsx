"use client";

import { useTodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const { addTodo, title, setTitle, isEdit } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      title: title,
      id: Date.now(),
    };
    addTodo(newTodo);
    setTitle("");
  };
  return (
    <div>
      <h1 className="capitalize text-3xl m-5 text-slate-700">
        What do you want to do?
      </h1>
      <div className="p-5  shadow-xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="todo..."
            className="rounded-l-xl px-6 py-3 outline-none border"
          />
          <button
            className="rounded-r-xl px-6 py-3 outline-none border"
            type="submit"
          >
            {isEdit ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
