import useFetch from "../hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export function UserList() {
  const { data, loading, error, refetch } = useFetch<User[]>(
    `https://jsonPlaceholder.typicode.com/users`,
  );

  return (
    <div className="user-list">
      <div className="header">
        <h2>ユーザー 一覧</h2>
        <button onClick={refetch} disabled={loading}>
          {loading ? "読み込み中..." : "再取得"}
        </button>
      </div>

      {loading && <div className="loading">読み込み中...</div>}

      {error && <div className="error">エラー: {error.message}</div>}

      {!loading && !error && data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong>
              <p>Email: {user.email}</p>
              <p>Company: {user.company.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
