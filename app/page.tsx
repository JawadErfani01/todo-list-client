import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="flex flex-col text-center items-center justify-center ">
      <TodoForm />
      <TodoList />
    </main>
  );
}
