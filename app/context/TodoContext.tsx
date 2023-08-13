"use client";
// Import the necessary dependencies
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useAlertContext } from "./AlertContext";

// Define the type for a Todo item
interface Todo {
  title: string;
  _id: number;
}

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
  loading: boolean;
}

// Create the TodoContext using createContext
const TodoContext = createContext<TodoContextValue | undefined>(undefined);

// Create the TodoProvider component
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [edit, setEdit] = useState<Todo>();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlertContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchTodo = async () => {
    const data = await fetch("http://localhost:5000/todo");
    const todo = await data.json();
    setTodos(todo);
    setLoading(false);
  };
  useEffect(() => {
    fetchTodo();
  }, []);
  // Define the addTodo function
  const addTodo = (newTodo: Todo) => {
    if (isEdit === true) {
      // Update the title of an existing todo
      fetch(`http://localhost:5000/todo/${edit?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === edit?._id ? { ...todo, title: data?.title } : todo
            )
          );
          showAlert("A todo updated successfully!");
        })
        .catch((error) => {
          showAlert("Error " + error);
        });

      setIsEdit(false);
    } else {
      fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Additional headers if required
        },
        body: JSON.stringify({ title: newTodo.title }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos((prevTodos) => [...prevTodos, data]);
          showAlert("New todo added successfully!");
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  // Define the editTodo function
  const editTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    if (todoToEdit) {
      setIsEdit(true);
      setEdit(todoToEdit);
      setTitle(todoToEdit.title);
    }
  };

  // Define the deleteTodo function
  const deleteTodo = (id: number) => {
    fetch(`http://localhost:5000/todo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(todos.filter((todo) => todo._id !== id));
        showAlert("A todo deleted successfully!");
      })
      .catch((error) => {
        showAlert("An error occur");
        console.error(error);
      });
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
    loading,
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
