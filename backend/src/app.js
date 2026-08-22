// Package imports
import e from "express";
import cors from "cors";

// Config imports
import { passport } from "./config/passport.js";

// Route imports
import { router as homeRouter } from "./routes/home.routes.js";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as postRouter } from "./routes/post.routes.js";

const app = e();

// Express configs
app.use(e.json());

// CORS configs
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

// Passport configs
app.use(passport.initialize());

// Routes
app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

export default app;
