import express from "express";
import "dotenv/config";
import { healthRouter, userRouter, questRouter, tagRouter } from "./route";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
import { allowCrossDomain } from "./utils/cors";

const app = express();

app.use(cookie());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(allowCrossDomain);

// ルーティング
app.use("/v1/health", healthRouter);
app.use("/v1/users", userRouter);
app.use("/v1/quests", questRouter);
app.use("/v1/tags", tagRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));
