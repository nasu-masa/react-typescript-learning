type TodoItemProps = {
  todo: { id: number; text: string };
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <li>
      {todo.text}
      {/* ボタンクリックで、親から渡されたonDelete関数を呼び出す */}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 8 }}>
        削除
      </button>
    </li>
  );
}

export default TodoItem;
