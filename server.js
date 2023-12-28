import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//configure env
dotenv.config();

//databse config
connectDB();

// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use("/api/auth", authRoutes);

//rest api
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//PORT
const PORT = process.env.PORT || 5080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});