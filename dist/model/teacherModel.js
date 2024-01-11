"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teacherModel = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("teachers", teacherModel);
