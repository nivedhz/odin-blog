import { Router } from "express";
import {
  loginPostController,
  signUpPostController,
} from "../../controllers/author/auth.controllers.js";
import { signUpValidation } from "../../validators/author/sign-up.validator.js";
import { loginValidation } from "../../validators/author/login.validator.js";

const router = Router();

router.post("/sign-up", signUpValidation, signUpPostController);
router.post("/login", loginValidation, loginPostController);

export { router };
