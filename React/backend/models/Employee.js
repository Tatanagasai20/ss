import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'employee'], required: true },
  mobile: { type: String },
  photo: { type: String },
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);


