import e from "express";
import cors from "cors";
import { router as homeRouter } from "./routes/home.routes.js";
import { router as authRouter } from "./routes/auth.routes.js";

const app = e();

// Express configs
app.use(e.json());

// CORS configs
app.use(cors());

// Routes
app.use("/", homeRouter);
app.use("/auth", authRouter);

export default app;
