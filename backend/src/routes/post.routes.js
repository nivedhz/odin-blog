import { Router } from "express";
import { newPostPostController } from "../controllers/post.controllers.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/new", ensureAuth, newPostPostController);

export { router };
