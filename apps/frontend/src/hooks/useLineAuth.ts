import { useEffect, useState } from "react";
import { initLiff, lineLogin } from "../services/authService";
import type { LoginResponse } from "../types";

export function useLineAuth(): {
  loading: boolean;
  error: string | null;
  result: LoginResponse | null;
  login: () => Promise<void>;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LoginResponse | null>(null);

  useEffect(() => {
    initLiff().catch((err) => {
      setError(err instanceof Error ? err.message : "LIFF 初始化失败");
    });
  }, []);

  const login = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await lineLogin();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, result, login };
}
