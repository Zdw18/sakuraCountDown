import type { ReactElement } from "react";
import type { LoginResponse } from "../types";

interface UserCardProps {
  result: LoginResponse;
}

export function UserCard({ result }: UserCardProps): ReactElement {
  const user = result.data.user;

  return (
    <section className="card">
      <h2>登录成功</h2>
      <p>昵称：{user.displayName}</p>
      <p>LINE User ID：{user.lineUserId}</p>
      <p>Session Key：{result.data.sessionKey}</p>
    </section>
  );
}
