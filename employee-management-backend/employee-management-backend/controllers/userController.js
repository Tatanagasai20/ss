// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ Get all employees (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Add a new user (Admin)
exports.addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.json({ message: "User added successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Update user (Admin)
exports.updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true }
        );
        res.json({ message: "User updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Delete user (Admin)
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
