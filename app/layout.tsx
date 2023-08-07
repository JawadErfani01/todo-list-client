import "./globals.css";
import { Inter } from "next/font/google";
import { TodoProvider } from "./context/TodoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "todo-list",
  description: "a fullStack todo-list app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
