import { useState } from "react";

// カスタムフックの戻り値の型を定義
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// カスタムフックを定義。初期値を受け取れるようにする
const useCounter = (initialValue: number = 0): UseCounterReturn => {
  // useStateを使って状態を管理
  const [count, setCount] = useState(initialValue);

  // ロジック（関数）を定義
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

export default useCounter;
