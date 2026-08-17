import { validationResult } from "express-validator";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpPostController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

export const loginPostController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { password, email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });
  const passwordStatus = await bcrypt.compare(password, user.password);
  if (passwordStatus) {
    res.status(201).json({
      success: true,
      message: "User logged in successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};
