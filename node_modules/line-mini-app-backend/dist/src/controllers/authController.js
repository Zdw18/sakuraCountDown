import { z } from "zod";
const LoginBodySchema = z.object({
    idToken: z.string().min(1)
});
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    login = async (req, res) => {
        const { idToken } = LoginBodySchema.parse(req.body);
        const result = await this.authService.loginWithLineIdToken(idToken);
        res.json({
            message: "登录成功",
            data: result
        });
    };
}
