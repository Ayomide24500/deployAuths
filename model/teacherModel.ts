import { Schema, model } from "mongoose";
import { iTeacherData } from "../utils/interface";

const teacherModel = new Schema<iTeacherData>(
  {
    teacherName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    verify: {
      type: Boolean,
    },
    token: {
      type: String,
    },
    contact: {
      type: String,
    },
    role: {
      type: String,
    },
    password: {
      type: String,
    },
    dateJoined: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default model<iTeacherData>("teachers", teacherModel);
