import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRouter from "./routers/userRouter.js";

import { connectDB } from "./config/Database.js";

//config configuration
dotenv.config({ path: "./config/config.env" });

// Database Connection
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev"));

// Routers
app.use("/api/auth", authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
