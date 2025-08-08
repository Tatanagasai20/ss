// routes/attendanceRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const multer = require("multer");
const path = require("path");
const {
    checkIn,
    checkOut,
    getMyAttendance,
    getAllAttendance
} = require("../controllers/attendanceController");

// Multer config for photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Employee check-in
router.post("/checkin", verifyToken, upload.single("photo"), checkIn);

// Employee check-out
router.post("/checkout", verifyToken, upload.single("photo"), checkOut);

// Get my attendance (Employee)
router.get("/me", verifyToken, getMyAttendance);

// Get all attendance (Admin)
router.get("/all", verifyToken, isAdmin, getAllAttendance);

module.exports = router;
