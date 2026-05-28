import { env } from "../config/env.js";
import { redis } from "../config/redis.js";
import { LineUserPayloadSchema, type LineUserPayload } from "../models/userModel.js";
import { UserRepository } from "../repositories/userRepository.js";
import type { User } from "../types/user.js";

interface VerifyLineTokenInput {
  idToken: string;
}

interface LoginResult {
  user: User;
  sessionKey: string;
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async verifyLineToken(input: VerifyLineTokenInput): Promise<LineUserPayload> {
    const body = new URLSearchParams({
      id_token: input.idToken,
      client_id: env.LINE_CHANNEL_ID
    });

    const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    if (!response.ok) {
      throw new Error("LINE token 校验失败");
    }

    const data = await response.json();
    return LineUserPayloadSchema.parse(data);
  }

  async loginWithLineIdToken(idToken: string): Promise<LoginResult> {
    const lineProfile = await this.verifyLineToken({ idToken });

    const user = await this.userRepository.upsert({
      lineUserId: lineProfile.sub,
      displayName: lineProfile.name,
      pictureUrl: lineProfile.picture
    });

    // 这里把 session 绑定到 lineUserId，便于后续鉴权演示。
    const sessionKey = `session:${user.lineUserId}`;
    await redis.set(
      sessionKey,
      JSON.stringify({
        userId: user.id,
        lineUserId: user.lineUserId
      }),
      "EX",
      60 * 60 * 24
    );

    return { user, sessionKey };
  }
}
