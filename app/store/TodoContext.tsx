"use client";
import { createContext, useContext, useState } from "react";

interface TodoProps {
  title: string;
  id: number;
}

export const Data: TodoProps[] = [
  { title: "Go to park", id: 1 },
  { title: "learn JavaScript", id: 2 },
  { title: "Exercise English", id: 3 },
];
interface Todo {
  title: string;
  id: number;
}

interface TodoContextValue {
  todos: Todo[];
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  isEdit: boolean;
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(Data);
  const [title, setTitle] = useState<string>("");
  const [edit, setEdit] = useState<Todo>();
  const [isEdit, setIsEdit] = useState(false);
  const addTodo = (newTodo: Todo) => {
    if (isEdit === true) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id == edit?.id ? { ...todo, title: newTodo?.title } : todo
        )
      );

      setIsEdit(false);
    } else {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  const editTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setIsEdit(true);
      setEdit(todoToEdit);
      setTitle(todoToEdit.title);
    }
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const value: TodoContextValue = {
    todos,
    title,
    setTitle,
    addTodo,
    deleteTodo,
    editTodo,
    isEdit,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
