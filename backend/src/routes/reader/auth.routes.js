import { Router } from "express";
import {
  loginPostController,
  signUpPostController,
} from "../../controllers/reader/auth.controllers.js";
import { signUpValidation } from "../../validators/reader/sign-up.validator.js";
import { loginValidation } from "../../validators/reader/login.validator.js";

const router = Router();

router.post("/sign-up", signUpValidation, signUpPostController);
router.post("/login", loginValidation, loginPostController);

export { router };
