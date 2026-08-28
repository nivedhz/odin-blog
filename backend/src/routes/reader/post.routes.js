import { Router } from "express";
import { postGetController } from "../../controllers/reader/reader.controllers";

const router = Router();

router.get("/", postGetController);

export { router };
