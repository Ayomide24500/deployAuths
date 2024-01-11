import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import teacherModel from "../model/teacherModel";
import { StatusCode, Teacher_Roles } from "../utils/enums";
import jwt from "jsonwebtoken";

export const createHeadTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { teacherName, address, contact, password, email } = req.body;

    console.log(req.body);

    const token = crypto.randomBytes(2).toString("hex");

    const generateSalt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, generateSalt);

    const teacher = await teacherModel.create({
      teacherName,
      email,
      address,
      contact,
      token,
      password: hashed,
      role: Teacher_Roles.HEAD_TEACHER,
    });
    return res.status(StatusCode.CREATED).json({
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error creating user",
    });
  }
};
export const createAssistantTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { teacherName, address, contact, password, email } = req.body;

    console.log(req.body);

    const token = crypto.randomBytes(2).toString("hex");

    const generateSalt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, generateSalt);

    const teacher = await teacherModel.create({
      teacherName,
      email,
      address,
      contact,
      token,
      password: hashed,
      role: Teacher_Roles.ASSISTANT_TEACHER,
    });
    return res
      .status(StatusCode.CREATED)
      .json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: "error creating user" });
  }
};
export const createSubjectTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { teacherName, address, contact, password, email } = req.body;

    console.log(req.body);

    const token = crypto.randomBytes(2).toString("hex");

    const generateSalt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, generateSalt);

    const teacher = await teacherModel.create({
      teacherName,
      email,
      address,
      contact,
      token,
      password: hashed,
      role: Teacher_Roles.SUBJECT_TEACHER,
    });
    return res
      .status(StatusCode.CREATED)
      .json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: "error creating user" });
  }
};

export const VerifyTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherID } = req.params;

    const findOne = await teacherModel.findById(teacherID);

    if (findOne) {
      const verify = await teacherModel.findByIdAndUpdate(
        teacherID,
        { verify: true },
        { new: true }
      );
      return res.status(StatusCode.OK).json({
        message: "teacher successfully verify",
        data: verify,
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "error finding user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error verifying teacher",
    });
  }
};

export const Signinteacher = async (req: any, res: Response) => {
  try {
    const { email, token } = req.body;

    const teacher = await teacherModel.findOne({ email });

    if (teacher) {
      if (teacher.token === token) {
        if (teacher.verify) {
          const encrypt = jwt.sign(
            { id: teacher._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
          );

          req.session.isAuth = true;
          req.session.userID = teacher._id;

          return res.status(StatusCode.OK).json({
            message: "welcome back",
            data: encrypt,
          });
        } else {
          return res.status(StatusCode.BAD_REQUEST).json({
            message: "Account has not yet been verified",
          });
        }
      } else {
        return res.status(StatusCode.BAD_REQUEST).json({
          message: "error reading token",
        });
      }
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "error reading teacher",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error signing teacher",
    });
  }
};
