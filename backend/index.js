import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from './routes/commentRoutes.js'
import { connectDB } from "./db/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: true,
  })
);

app.get("/api-check", async (req, res) => {
  res.status(200).send({ message: "Api is Working !" });
});

app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/comment',commentRoutes)

app.listen(PORT, () => {
  console.log("Server Started On Port " + PORT);
});
