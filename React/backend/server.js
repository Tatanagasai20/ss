// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow base64 photos

app.get("/", (req, res) => res.send("Employee Attendance API is running"));

// mount under /api to match frontend VITE_API_URL
app.use("/api", authRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", leaveRoutes);
app.use("/api", adminRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
