import { Router } from "express";
import {
  newPostPostController,
  postDeleteController,
  postEditPostController,
  postGetContrller,
  postPublishPatchController,
  postsGetController,
  postUnpublishPatchController,
} from "../../controllers/author/author.controllers.js";
import { ensureAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

// Get all
router.get("/", ensureAuth, postsGetController);
// Get one
router.get("/:postId", ensureAuth, postGetContrller);

// New post
router.post("/", ensureAuth, newPostPostController);

// Delete post
router.delete("/:postId", ensureAuth, postDeleteController);
// Edit post
router.patch("/:postId", ensureAuth, postEditPostController);

// Publish and unpublish
router.patch("/:postId/publish", ensureAuth, postPublishPatchController);
router.patch("/:postId/unpublish", ensureAuth, postUnpublishPatchController);

export { router };
