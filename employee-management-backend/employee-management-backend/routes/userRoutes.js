// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// Get all users (Admin)
router.get("/", verifyToken, isAdmin, getAllUsers);

// Add new user (Admin)
router.post("/", verifyToken, isAdmin, addUser);

// Update user (Admin)
router.put("/:id", verifyToken, isAdmin, updateUser);

// Delete user (Admin)
router.delete("/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
