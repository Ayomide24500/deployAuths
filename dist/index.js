"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./utils/dbConfig");
(0, dotenv_1.config)();
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    console.log("Server is running... 🚀");
    (0, dbConfig_1.dbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("uncaughtException:", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection:", reason);
    server.close(() => {
        process.exit(1);
    });
});
