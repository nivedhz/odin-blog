import { body } from "express-validator";
import { prisma } from "../../lib/prisma.js";

export const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be atleast 3 characters long")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });
      if (user) {
        throw new Error("Reader or Author already exists");
      }
    })
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (user) {
        throw new Error("Reader or Author already exists");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("The passwords don't match");
    }
    return true;
  }),
];
