"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
// import winston from "winston";
const winston_1 = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: "info",
        filename: `${app_root_path_1.default}/logs/app.log`,
        handleExceptions: true,
        json: true,
        // maxsize: 5242880, // 5MB
        // maxFiles: 5,
        colorize: false,
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
// instantiate a new Winston Logger with the settings defined above
const logger = winston_1.createLogger({
    format: combine(
    // label({ label: "wa-corp-scrapper" }),
    timestamp(), prettyPrint()),
    transports: [
        new winston_1.transports.File(options.file),
        new winston_1.transports.Console(options.console),
    ],
    exitOnError: false,
});
exports.default = logger;
//# sourceMappingURL=winston.js.map