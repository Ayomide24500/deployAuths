"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signinteacher = exports.VerifyTeacher = exports.createSubjectTeacher = exports.createAssistantTeacher = exports.createHeadTeacher = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const enums_1 = require("../utils/enums");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createHeadTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherName, address, contact, password, email } = req.body;
        console.log(req.body);
        const token = crypto_1.default.randomBytes(2).toString("hex");
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const teacher = yield teacherModel_1.default.create({
            teacherName,
            email,
            address,
            contact,
            token,
            password: hashed,
            role: enums_1.Teacher_Roles.HEAD_TEACHER,
        });
        return res.status(enums_1.StatusCode.CREATED).json({
            message: "Teacher created successfully",
            data: teacher,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error creating user",
        });
    }
});
exports.createHeadTeacher = createHeadTeacher;
const createAssistantTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherName, address, contact, password, email } = req.body;
        console.log(req.body);
        const token = crypto_1.default.randomBytes(2).toString("hex");
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const teacher = yield teacherModel_1.default.create({
            teacherName,
            email,
            address,
            contact,
            token,
            password: hashed,
            role: enums_1.Teacher_Roles.ASSISTANT_TEACHER,
        });
        return res
            .status(enums_1.StatusCode.CREATED)
            .json({ message: "Teacher created successfully", teacher });
    }
    catch (error) {
        console.error(error);
        return res
            .status(enums_1.StatusCode.BAD_REQUEST)
            .json({ message: "error creating user" });
    }
});
exports.createAssistantTeacher = createAssistantTeacher;
const createSubjectTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherName, address, contact, password, email } = req.body;
        console.log(req.body);
        const token = crypto_1.default.randomBytes(2).toString("hex");
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const teacher = yield teacherModel_1.default.create({
            teacherName,
            email,
            address,
            contact,
            token,
            password: hashed,
            role: enums_1.Teacher_Roles.SUBJECT_TEACHER,
        });
        return res
            .status(enums_1.StatusCode.CREATED)
            .json({ message: "Teacher created successfully", teacher });
    }
    catch (error) {
        console.error(error);
        return res
            .status(enums_1.StatusCode.BAD_REQUEST)
            .json({ message: "error creating user" });
    }
});
exports.createSubjectTeacher = createSubjectTeacher;
const VerifyTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherID } = req.params;
        const findOne = yield teacherModel_1.default.findById(teacherID);
        if (findOne) {
            const verify = yield teacherModel_1.default.findByIdAndUpdate(teacherID, { verify: true }, { new: true });
            return res.status(enums_1.StatusCode.OK).json({
                message: "teacher successfully verify",
                data: verify,
            });
        }
        else {
            return res.status(enums_1.StatusCode.BAD_REQUEST).json({
                message: "error finding user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error verifying teacher",
        });
    }
});
exports.VerifyTeacher = VerifyTeacher;
const Signinteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const teacher = yield teacherModel_1.default.findOne({ email });
        if (teacher) {
            if (teacher.token === token) {
                if (teacher.verify) {
                    const encrypt = jsonwebtoken_1.default.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
                    req.session.isAuth = true;
                    req.session.userID = teacher._id;
                    return res.status(enums_1.StatusCode.OK).json({
                        message: "welcome back",
                        data: encrypt,
                    });
                }
                else {
                    return res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        message: "Account has not yet been verified",
                    });
                }
            }
            else {
                return res.status(enums_1.StatusCode.BAD_REQUEST).json({
                    message: "error reading token",
                });
            }
        }
        else {
            return res.status(enums_1.StatusCode.BAD_REQUEST).json({
                message: "error reading teacher",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error signing teacher",
        });
    }
});
exports.Signinteacher = Signinteacher;
