import { Router } from "express";
import {
  commentDeleteController,
  commentPutController,
  postGetController,
  postsGetController,
} from "../../controllers/reader/reader.controllers.js";
import { ensureAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", postsGetController);
router.get("/:postId", postGetController);

router.put("/comment", ensureAuth, commentPutController);
router.delete("/comment/:commentId", ensureAuth, commentDeleteController);

export { router };
