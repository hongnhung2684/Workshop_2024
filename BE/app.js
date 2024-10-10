import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";
const app = express();
app.use(cors());
app.use(express.json());

//routers
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", )

// kết nối tới MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/xuong_react");

export const viteNodeApp = app;
