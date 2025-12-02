import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import os from "os";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://192.168.1.6:3000", "http://192.168.1.6:8081"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api-check", async (req, res) => {
  res.status(200).send({ message: "Api is Working !" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", commentRoutes);

app.listen(PORT, () => {
  const networkInterfaces = os.networkInterfaces();
  let localIP = "localhost";

  Object.keys(networkInterfaces).forEach((key) => {
    networkInterfaces[key].forEach((details) => {
      if (details.family === "IPv4" && !details.internal) {
        localIP = details.address;
      }
    });
  });

  console.log(`🚀 Server running at:`);
  console.log(`➡ Local:    http://localhost:${PORT}`);
  console.log(`➡ Network:  http://${localIP}:${PORT}`);
});
