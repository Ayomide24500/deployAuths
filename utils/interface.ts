import { Document } from "mongoose";

interface iTeacher {
  teacherName: string;
  role: string;
  email: string;
  address: string;
  verify: boolean;
  contact: string;
  token: string;
  dateJoined: Date | any;
  password: string;
}

export interface iTeacherData extends iTeacher, Document {}
