// Package imports
import e from "express";
import cors from "cors";

import { config } from "dotenv";

// Config imports
import { passport } from "./config/passport.js";

// Route imports
import { router as homeRouter } from "./routes/home.routes.js";
import { router as authRouter } from "./routes/auth.routes.js";

config();

const app = e();

// Express configs
app.use(e.json());

// CORS configs
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Passport configs
app.use(passport.initialize());

// Routes
app.use("/", homeRouter);
app.use("/auth", authRouter);

export default app;
