// controllers/attendanceController.js
const Attendance = require("../models/Attendance");
const moment = require("moment");

// ✅ Employee Check-in
exports.checkIn = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const today = moment().startOf("day");

        // Check if already checked in today
        const existingRecord = await Attendance.findOne({
            employeeId,
            date: { $gte: today.toDate(), $lte: moment(today).endOf("day").toDate() }
        });

        if (existingRecord) {
            return res.status(400).json({ message: "Already checked in today" });
        }

        const attendance = await Attendance.create({
            employeeId,
            date: new Date(),
            checkInTime: moment().format("HH:mm"),
            checkInPhoto: req.file ? req.file.filename : null // If using photo upload
        });

        res.json({ message: "Checked in successfully", attendance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Employee Check-out
exports.checkOut = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const today = moment().startOf("day");

        const record = await Attendance.findOne({
            employeeId,
            date: { $gte: today.toDate(), $lte: moment(today).endOf("day").toDate() }
        });

        if (!record) {
            return res.status(400).json({ message: "You must check in first" });
        }
        if (record.checkOutTime) {
            return res.status(400).json({ message: "Already checked out today" });
        }

        record.checkOutTime = moment().format("HH:mm");
        record.checkOutPhoto = req.file ? req.file.filename : null;
        await record.save();

        res.json({ message: "Checked out successfully", record });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get logged-in user's attendance
exports.getMyAttendance = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const records = await Attendance.find({ employeeId }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get all attendance (Admin)
exports.getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate("employeeId", "name email")
            .sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
