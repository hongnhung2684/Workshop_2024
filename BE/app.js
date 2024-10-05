import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product.js";
const app = express();
app.use(cors);
app.use(express.json());
app.use("/api", productRouter);

// kết nối tới MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/xuong_react");

export const viteNodeApp = app;
