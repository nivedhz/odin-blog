import { Router } from "express";
import { ensureAuth } from "../middlewares/auth.middleware.js";
import { homeGetController } from "../controllers/home.controllers.js";

const router = Router();

router.get("/", ensureAuth, homeGetController);

export { router };
