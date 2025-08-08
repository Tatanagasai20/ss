// routes/leaveRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const {
    requestLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave
} = require("../controllers/leaveController");

// Employee requests leave
router.post("/request", verifyToken, requestLeave);

// Employee views own leaves
router.get("/my", verifyToken, getMyLeaves);

// Admin views all leaves
router.get("/all", verifyToken, isAdmin, getAllLeaves);

// Admin approves leave
router.patch("/approve/:id", verifyToken, isAdmin, approveLeave);

// Admin rejects leave
router.patch("/reject/:id", verifyToken, isAdmin, rejectLeave);

module.exports = router;
