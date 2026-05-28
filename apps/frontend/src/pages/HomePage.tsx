import type { ReactElement } from "react";
import { UserCard } from "../components/UserCard";
import { useLineAuth } from "../hooks/useLineAuth";

export function HomePage(): ReactElement {
  const { loading, error, result, login } = useLineAuth();

  return (
    <main className="container">
      <h1>LINE Mini App Starter</h1>
      <p>React + Vite + TypeScript + Node.js MVC</p>

      <button type="button" onClick={() => void login()} disabled={loading}>
        {loading ? "登录中..." : "使用 LINE 登录"}
      </button>

      {error && <p className="error">{error}</p>}
      {result && <UserCard result={result} />}
    </main>
  );
}
