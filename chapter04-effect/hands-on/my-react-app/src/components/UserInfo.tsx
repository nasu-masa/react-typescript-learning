import { useState, useEffect } from "react";

// APIから返ってくるユーザーデータの型
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

function UserInfo() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("ユーザー情報の取得に失敗しました。");
        }

        if (response.ok) {
          console.log(response.ok);
        }

        const data = await response.json();
          setUser(data);
          console.log(data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setError(err.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // クリーンアップ関数
    return () => {
      controller.abort();
    };
  }, [userId]); // userId に依存

  const handleNextUser = () => {
    setUserId((id) => id + 1);
  };

  return (
    <div>
      <h2>ユーザー情報</h2>
      <p>User Id: {userId}</p>

      {user && (
        <div>
          <p>
            <strong>名前:</strong>
            {user.name}
          </p>
          <p>
            <strong>ユーザー名:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
      <hr />
      <button onClick={handleNextUser} disabled={loading}>
        {loading ? "読み込み中..." : "次のユーザーへ"}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UserInfo;
