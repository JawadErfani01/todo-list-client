"use client";
// Import the necessary dependencies
import { createContext, useContext, useState, useRef } from "react";
import { useAlertContext } from "./AlertContext";

// Define the type for a Todo item
interface Todo {
  title: string;
  id: number;
}

// An array of sample data
export const Data: Todo[] = [
  { title: "Go to park", id: 1 },
  { title: "learn JavaScript", id: 2 },
  { title: "Exercise English", id: 3 },
];

// Define the type for the TodoContextValue
interface TodoContextValue {
  todos: Todo[];
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  isEdit: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

// Create the TodoContext using createContext
const TodoContext = createContext<TodoContextValue | undefined>(undefined);

// Create the TodoProvider component
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Set up state and hooks
  const [todos, setTodos] = useState<Todo[]>(Data);
  const [title, setTitle] = useState<string>("");
  const [edit, setEdit] = useState<Todo>();
  const [isEdit, setIsEdit] = useState(false);
  const { showAlert } = useAlertContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Define the addTodo function
  const addTodo = (newTodo: Todo) => {
    if (isEdit === true) {
      // Update the title of an existing todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === edit?.id ? { ...todo, title: newTodo?.title } : todo
        )
      );
      showAlert("A todo updated successfully!");
      setIsEdit(false);
    } else {
      // Add a new todo to the list
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      showAlert("New todo added successfully!");
    }
  };

  // Define the editTodo function
  const editTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setIsEdit(true);
      setEdit(todoToEdit);
      setTitle(todoToEdit.title);
    }
  };

  // Define the deleteTodo function
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    showAlert("A todo deleted successfully!");
  };

  // Create the value object for the context
  const value: TodoContextValue = {
    todos,
    title,
    setTitle,
    addTodo,
    deleteTodo,
    editTodo,
    isEdit,
    inputRef,
  };

  // Provide the value through the TodoContext.Provider
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Create a custom hook to use the TodoContext
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
