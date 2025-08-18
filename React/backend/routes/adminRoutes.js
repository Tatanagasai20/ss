
// import { Router } from "express";
// import { auth, requireRole } from "../middlewares/authMiddleware.js";
// import {
//   getAllEmployees,
//   updateEmployee,
//   deleteEmployee,
//   getAllLeaveRequests,
//   adminUpdateLeaveStatus,
//   createEmployee
// } from "../controllers/adminController.js";

// const router = Router();

// // protect all admin routes
// router.use(auth, requireRole("admin"));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.get("/admin/employees", getAllEmployees);
// // router.put("/admin/employee/:empId", updateEmployee);
// // router.delete("/admin/employee/:empId", deleteEmployee);

// router.get("/admin/leave-requests", getAllLeaveRequests);
// router.put("/admin/leave-request", adminUpdateLeaveStatus);
// router.post("/admin/employees",upload.single("photo"), createEmployee);
// // router.put("/admin/employees/:empId", updateEmployee);



// // router.get("/admin/employees", getAllEmployees);
// // router.post("/admin/employees", createEmployee);
// router.put("/admin/employees/:id",upload.single("photo"), updateEmployee);
// router.delete("/admin/employees/:empId", deleteEmployee);


// // router.post("/", upload.single("photo"), createEmployee);
// // router.get("/", getAllEmployees);
// // router.put("/:id", upload.single("photo"), updateEmployee); // <-- make sure :id is here
// // router.delete("/:id", deleteEmployee);




// export default router;


















// routes/adminRoutes.js
import { Router } from "express";
import { auth, requireRole } from "../middlewares/authMiddleware.js";
import {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getAllLeaveRequests,
  adminUpdateLeaveStatus,
  createEmployee
} from "../controllers/adminController.js";
import { listAllAttendance } from "../controllers/attendanceController.js";

const router = Router();

// protect all admin routes
router.use(auth, requireRole("admin"));

// Employee routes
router.get("/admin/employees", getAllEmployees);
router.post("/admin/employees", createEmployee);
router.put("/admin/employees/:empId", updateEmployee);
router.delete("/admin/employees/:empId", deleteEmployee);

// Leave routes
router.get("/admin/leave-requests", getAllLeaveRequests);
router.put("/admin/leave-request", adminUpdateLeaveStatus);
// NEW: admin-only attendance list
router.get("/admin/attendance", auth, listAllAttendance);

export default router;



















