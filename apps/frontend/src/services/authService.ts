import liff from "@line/liff";
import { postJson } from "./httpClient";
import type { LoginResponse } from "../types";

const LIFF_ID = import.meta.env.VITE_LIFF_ID;

export async function initLiff(): Promise<void> {
  await liff.init({ liffId: LIFF_ID });
  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }
}

export async function lineLogin(): Promise<LoginResponse> {
  const idToken = liff.getIDToken();
  if (!idToken) {
    throw new Error("未获取到 LINE ID Token");
  }

  return postJson<LoginResponse>("/auth/login", { idToken });
}
