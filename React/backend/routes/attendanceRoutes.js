// routes/attendanceRoutes.js
import { Router } from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { checkIn, checkOut, listEmployeeAttendance } from "../controllers/attendanceController.js";

const router = Router();

// matches frontend: /employee/:empId/checkin | /employee/:empId/checkout | /employee/:empId/attendance
router.post("/employee/:empId/checkin", auth, checkIn);
router.post("/employee/:empId/checkout", auth, checkOut);
router.get("/employee/:empId/attendance", auth, listEmployeeAttendance);

export default router;
