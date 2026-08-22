import { Router } from "express";
import {
  newPostPostController,
  postsGetController,
} from "../controllers/post.controllers.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", ensureAuth, postsGetController);

router.post("/new", ensureAuth, newPostPostController);

export { router };
