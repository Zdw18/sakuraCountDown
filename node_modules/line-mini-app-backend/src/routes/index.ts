import { Router } from "express";
import { authRoutes } from "./authRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.use("/auth", authRoutes);

export { router as apiRoutes };
