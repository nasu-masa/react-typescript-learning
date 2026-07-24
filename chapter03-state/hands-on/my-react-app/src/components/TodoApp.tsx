import { useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

// TODOの型を定義しておくと便利
type Todo = { id: number; text: string };

function TodoApp() {
  // アプリケーションのメインState
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Reactを学ぶ" },
    { id: 2, text: "寝る" },
  ]);

  // TODOを追加する関数
  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text };
    // イミュータブルに追加
    setTodos([...todos, newTodo]);
  };

  // TODOを削除する関数
  const deleteTodo = (id: number) => {
    // イミュータブルに削除
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>TODOリスト</h1>
      {/* State更新用の関数をPropsとして渡す */}
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
    </div>
  );
}
export default TodoApp;
