const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    checkInTime: String,
    checkOutTime: String,
    checkInPhoto: String,
    checkOutPhoto: String,
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
