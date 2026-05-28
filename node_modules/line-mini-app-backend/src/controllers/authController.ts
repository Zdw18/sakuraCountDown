import { Request, Response } from "express";
import { z } from "zod";
import { AuthService } from "../services/authService.js";

const LoginBodySchema = z.object({
  idToken: z.string().min(1)
});

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const { idToken } = LoginBodySchema.parse(req.body);
    const result = await this.authService.loginWithLineIdToken(idToken);

    res.json({
      message: "登录成功",
      data: result
    });
  };
}
