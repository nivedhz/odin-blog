// Package imports
import e from "express";
import cors from "cors";

// Config imports
import { passport } from "./config/passport.js";

// Route imports
import { router as authRouter } from "./routes/auth.routes.js";
import { router as authorRouter } from "./routes/author.routes.js";
import { router as readerRouter } from "./routes/reader.routes.js";

const app = e();

// Express configs
app.use(e.json());

const allowedOrigins = [
  process.env.AUTHOR_CLIENT_URL,
  process.env.READER_CLIENT_URL,
];

// CORS configs
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  }),
);

// Passport configs
app.use(passport.initialize());

// Routes
app.use("/author/auth", authRouter);
app.use("/author/posts", authorRouter);
app.use("/reader/posts", readerRouter);

export default app;
