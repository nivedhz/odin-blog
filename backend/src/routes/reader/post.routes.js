import { Router } from "express";
import {
  commentPutController,
  postGetController,
  postsGetController,
} from "../../controllers/reader/reader.controllers.js";
import { ensureAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", postsGetController);
router.get("/:postId", postGetController);

router.put("/comment", ensureAuth, commentPutController);

export { router };
