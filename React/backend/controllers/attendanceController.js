// // controllers/attendanceController.js
// import Employee from "../models/Employee.js";
// import Attendance from "../models/Attendance.js";
// import { verifyFaces } from "../utils/faceVerification.js";

// function canAccessEmployee(req, empId) {
//   return req.user?.role === "admin" || req.user?.empId === empId;
// }

// export async function checkIn(req, res) {
//   try {
//     const { empId } = req.params;
//     const { photo } = req.body;

//     if (!canAccessEmployee(req, empId)) return res.status(403).json({ message: "Forbidden" });
//     if (!photo) return res.status(400).json({ message: "photo (base64) is required" });

//     const employee = await Employee.findOne({ empId });
//     if (!employee) return res.status(404).json({ message: "Employee not found" });

//     // prevent duplicate open check-in
//     const open = await Attendance.findOne({ employee: employee._id, checkOutTime: { $exists: false } });
//     if (open) return res.status(400).json({ message: "Already checked in. Please check out first." });

//     const record = await Attendance.create({
//       employee: employee._id,
//       checkInTime: new Date(),
//       checkInPhoto: photo
//     });

//     return res.json({ message: "Checked in successfully", attendanceId: record._id });
//   } catch (e) {
//     res.status(500).json({ message: "Server error" });
//   }
// }

// export async function checkOut(req, res) {
//   try {
//     const { empId } = req.params;
//     const { photo } = req.body;

//     if (!canAccessEmployee(req, empId)) return res.status(403).json({ message: "Forbidden" });
//     if (!photo) return res.status(400).json({ message: "photo (base64) is required" });

//     const employee = await Employee.findOne({ empId });
//     if (!employee) return res.status(404).json({ message: "Employee not found" });

//     const open = await Attendance.findOne({ employee: employee._id, checkOutTime: { $exists: false } }).sort({ createdAt: -1 });
//     if (!open) return res.status(400).json({ message: "No open check-in found" });

//     // OPTIONAL: verify face between check-in and check-out photos
//     const ok = await verifyFaces(open.checkInPhoto, photo);
//     if (!ok) return res.status(400).json({ message: "Face verification failed" });

//     open.checkOutTime = new Date();
//     open.checkOutPhoto = photo;
//     open.totalMs = Math.max(0, open.checkOutTime - open.checkInTime);
//     await open.save();

//     return res.json({ message: "Checked out successfully", workedMs: open.totalMs });
//   } catch (e) {
//     res.status(500).json({ message: "Server error" });
//   }
// }

// export async function listEmployeeAttendance(req, res) {
//   try {
//     const { empId } = req.params;
//     const { from, to } = req.query;

//     if (!canAccessEmployee(req, empId)) return res.status(403).json({ message: "Forbidden" });

//     const employee = await Employee.findOne({ empId });
//     if (!employee) return res.status(404).json({ message: "Employee not found" });

//     const q = { employee: employee._id };
//     if (from || to) {
//       q.createdAt = {};
//       if (from) q.createdAt.$gte = new Date(from);
//       if (to) q.createdAt.$lte = new Date(to);
//     }

//     const rows = await Attendance.find(q).sort({ createdAt: -1 });

//     // Frontend expects array with checkInTime/checkOutTime fields
//     res.json(rows);
//   } catch (e) {
//     res.status(500).json({ message: "Server error" });
//   }
// }
























// controllers/attendanceController.js
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import { verifyFaces } from "../utils/faceVerification.js";

function canAccessEmployee(req, empId) {
  return req.user?.role === "admin" || req.user?.empId === empId;
}

export async function checkIn(req, res) {
  try {
    const { empId } = req.params;
    const { photo } = req.body;

    if (!canAccessEmployee(req, empId)) return res.status(403).json({ message: "Forbidden" });
    if (!photo) return res.status(400).json({ message: "photo (base64) is required" });

    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    if (!employee.photo) return res.status(400).json({ message: "No registered photo on file" });

    // prevent duplicate open check-in
    const open = await Attendance.findOne({ employee: employee._id, checkOutTime: { $exists: false } });
    if (open) return res.status(400).json({ message: "Already checked in. Please check out first." });

    // === DS verification: live vs registered photo
    const { ok, score } = await verifyFaces(employee.photo, photo);
    if (!ok) {
      return res.status(400).json({
        message: "Face verification failed on check-in",
        ...(score != null ? { score } : {})
      });
    }

    const record = await Attendance.create({
      employee: employee._id,
      checkInTime: new Date(),
      checkInPhoto: photo
    });

    return res.json({ message: "Checked in successfully", attendanceId: record._id, score });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function checkOut(req, res) {
  try {
    const { empId } = req.params;
    const { photo } = req.body;

    if (!canAccessEmployee(req, empId)) return res.status(403).json({ message: "Forbidden" });
    if (!photo) return res.status(400).json({ message: "photo (base64) is required" });

    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const open = await Attendance.findOne({
      employee: employee._id,
      checkOutTime: { $exists: false }
    }).sort({ createdAt: -1 });

    if (!open) return res.status(400).json({ message: "No open check-in found" });

    // === DS verification: live vs registered photo
    const primary = await verifyFaces(employee.photo, photo);
    if (!primary.ok) {
      return res.status(400).json({
        message: "Face verification failed on check-out",
        ...(primary.score != null ? { score: primary.score } : {})
      });
    }

    // OPTIONAL extra check: live vs check-in photo (same person who checked in)
    // You can toggle this on/off by commenting out the next 5 lines.
    const secondary = await verifyFaces(open.checkInPhoto, photo);
    if (!secondary.ok) {
      return res.status(400).json({
        message: "Face mismatch with original check-in photo",
        ...(secondary.score != null ? { score: secondary.score } : {})
      });
    }

    open.checkOutTime = new Date();
    open.checkOutPhoto = photo;
    open.totalMs = Math.max(0, open.checkOutTime - open.checkInTime);
    await open.save();

    return res.json({
      message: "Checked out successfully",
      workedMs: open.totalMs,
      score: primary.score
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function listEmployeeAttendance(req, res) {
  try {
    const { empId } = req.params;
    const { from, to } = req.query;

    if (!canAccessEmployee(req, empId)) return res.status(403).json({ message: "Forbidden" });

    const employee = await Employee.findOne({ empId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const q = { employee: employee._id };
    if (from || to) {
      q.createdAt = {};
      if (from) q.createdAt.$gte = new Date(from);
      if (to) q.createdAt.$lte = new Date(to);
    }

    const rows = await Attendance.find(q).sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}

// ========== NEW: admin-only list ==========
export async function listAllAttendance(req, res) {
  try {
    if (req.user?.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const { from, to, empId } = req.query;
    const q = {};
    if (from || to) {
      q.createdAt = {};
      if (from) q.createdAt.$gte = new Date(from);
      if (to) q.createdAt.$lte = new Date(to);
    }

    // Optional filter by specific employee
    if (empId) {
      const emp = await Employee.findOne({ empId });
      if (!emp) return res.json([]); // no such employee => empty
      q.employee = emp._id;
    }

    const rows = await Attendance.find(q)
      .populate("employee", "empId name email role")
      .sort({ createdAt: -1 })
      .lean();

    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}
