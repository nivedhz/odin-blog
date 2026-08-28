import { Router } from "express";
import { postGetController } from "../../controllers/reader/reader.controllers.js";

const router = Router();

router.get("/", postGetController);

export { router };
