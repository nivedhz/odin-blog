import { Router } from "express";
import {
  newPostPostController,
  postDeleteController,
  postEditPostController,
  postGetContrller,
  postPublishPatchController,
  postsGetController,
  postUnpublishPatchController,
} from "../controllers/author.controllers.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Author side
router.get("/", ensureAuth, postsGetController);
router.get("/:postId", ensureAuth, postGetContrller);

router.post("/new", ensureAuth, newPostPostController);

router.delete("/delete/:postId", ensureAuth, postDeleteController);

router.patch("/publish/:postId", ensureAuth, postPublishPatchController);
router.patch("/unpublish/:postId", ensureAuth, postUnpublishPatchController);

router.post("/edit/:postId", ensureAuth, postEditPostController);

export { router };
