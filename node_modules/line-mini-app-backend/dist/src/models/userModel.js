import { z } from "zod";
// 对来自客户端的 user payload 做结构校验。
export const LineUserPayloadSchema = z.object({
    sub: z.string().min(1),
    name: z.string().min(1),
    picture: z.string().url().optional()
});
