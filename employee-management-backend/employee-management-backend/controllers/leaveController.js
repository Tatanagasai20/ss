// controllers/leaveController.js
const Leave = require("../models/Leave");

// ✅ Employee requests leave
exports.requestLeave = async (req, res) => {
    try {
        const { type, fromDate, toDate, reason } = req.body;
        const leave = await Leave.create({
            employeeId: req.user.id,
            type,
            fromDate,
            toDate,
            reason
        });
        res.json({ message: "Leave request submitted", leave });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Employee views own leave requests
exports.getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employeeId: req.user.id }).sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Admin views all leave requests
exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate("employeeId", "name email")
            .sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Admin approves leave
exports.approveLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ message: "Leave not found" });

        leave.status = "approved";
        await leave.save();

        res.json({ message: "Leave approved", leave });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Admin rejects leave
exports.rejectLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ message: "Leave not found" });

        leave.status = "rejected";
        await leave.save();

        res.json({ message: "Leave rejected", leave });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
