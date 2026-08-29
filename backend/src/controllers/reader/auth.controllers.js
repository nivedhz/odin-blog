import { validationResult } from "express-validator";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../../../generated/prisma/index.js";

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
  const user = await prisma.user.findMany({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (user.length > 0) {
    return res.json({
      success: false,
      message: "User already exists",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
      role: Role.READER,
    },
  });

  const payload = { id: newUser.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    username: newUser.username,
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
      role: Role.READER,
    },
    select: {
      password: true,
      id: true,
      username: true,
    },
  });

  // No user in db
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "User doesn't exist" });
  }
  const passwordStatus = await bcrypt.compare(password, user.password);
  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Password not the same
  if (!passwordStatus) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.status(201).json({
    success: true,
    message: "User logged in successfully",
    token,
    username: user.username,
  });
};
