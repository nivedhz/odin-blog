import { body } from "express-validator";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import { Role } from "../../../generated/prisma/index.js";

export const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: { email: value, role: Role.AUTHOR },
      });
      if (!user) {
        throw new Error("Invalid email or password");
      }
    })
    .normalizeEmail(),
  body("password").custom(async (value, { req }) => {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (user) {
      const password = await bcrypt.compare(value, user.password);
      if (!password) {
        throw new Error("Invalid email or password");
      }
    }
  }),
];
