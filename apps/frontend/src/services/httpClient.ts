const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`请求失败: ${errorMessage}`);
  }

  return response.json() as Promise<T>;
}
