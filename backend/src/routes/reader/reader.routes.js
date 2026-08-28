import { Router } from "express";
import { router as authRouter } from "./auth.routes.js";
import { router as postRouter } from "./post.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);

export { router };
