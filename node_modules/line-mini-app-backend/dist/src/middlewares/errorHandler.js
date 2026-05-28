import { ZodError } from "zod";
export function errorHandler(error, _req, res, _next) {
    if (error instanceof ZodError) {
        res.status(400).json({
            message: "参数校验失败",
            issues: error.issues
        });
        return;
    }
    const message = error instanceof Error ? error.message : "服务器内部错误";
    res.status(500).json({ message });
}
