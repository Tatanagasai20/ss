// controllers/adminController.js
import Employee from "../models/Employee.js";
import LeaveRequest from "../models/LeaveRequest.js";

export async function getAllEmployees(req, res) {
  const rows = await Employee.find().sort({ createdAt: -1 });
  res.json(rows);
}

// export async function updateEmployee(req, res) {
//   const { empId } = req.params;
//   const updates = req.body || {};
//   const doc = await Employee.findOneAndUpdate({ empId }, updates, { new: true });
//   if (!doc) return res.status(404).json({ message: "Employee not found" });
//   res.json({ message: "Employee updated", employee: doc });
// }

export async function deleteEmployee(req, res) {
  const { empId } = req.params;
  const doc = await Employee.findOneAndDelete({ empId });
  if (!doc) return res.status(404).json({ message: "Employee not found" });
  res.json({ message: "Employee deleted" });
}

export async function getAllLeaveRequests(req, res) {
  const rows = await LeaveRequest.find()
    .populate("employeeId", "empId name")
    .sort({ createdAt: -1 });
  res.json(rows);
}

export async function adminUpdateLeaveStatus(req, res) {
  const { leaveRequestId, status } = req.body;
  if (!leaveRequestId || !["Approved", "Rejected", "Pending"].includes(status)) {
    return res.status(400).json({ message: "Invalid leaveRequestId or status" });
  }
  const doc = await LeaveRequest.findByIdAndUpdate(
    leaveRequestId,
    { status },
    { new: true }
  ).populate("employeeId", "empId name");
  if (!doc) return res.status(404).json({ message: "Leave request not found" });
  res.json({ message: `Leave ${status.toLowerCase()}`, leaveRequest: doc });
}




// Add Employee
export async function createEmployee(req, res) {
  try {
    const { empId, name, email, role, mobile, photo } = req.body;
    if (!empId || !name || !email || !role || !mobile || !photo) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
    const existingEmployee = await Employee.findOne({ empId });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee with this ID already exists" });
    }
    const employee = new Employee({ empId, name, email, role, mobile, photo });
    await employee.save();
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
}

// Edit Employee
export async function updateEmployee(req, res) {
  try {
    const { empId } = req.params;
    const allowed = ["name", "email", "role", "mobile", "photo"];
    const updates = {};
    for (const k of allowed) {
      if (k in req.body) updates[k] = req.body[k];
    }
    const updated = await Employee.findOneAndUpdate(
      { empId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee updated successfully", employee: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
}



































