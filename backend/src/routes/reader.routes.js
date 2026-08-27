import { Router } from "express";
import { postGetController } from "../controllers/reader.controllers.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", ensureAuth, postGetController);

export { router };
