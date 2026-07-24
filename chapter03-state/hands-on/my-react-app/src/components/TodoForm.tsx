import React, { useState } from "react";

type TodoFormProps = {
  onAdd: (text: string) => void;
};

function TodoForm({ onAdd }: TodoFormProps) {
  // フォームの入力値を管理するState
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信によるページリロードを防ぐ
    if (!text.trim()) return; //空文字の場合は何もしない

    onAdd(text); // 親から渡されたonAdd関数を呼び出す
    setText(""); // 入力フォームを空にする
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
}

export default TodoForm;
