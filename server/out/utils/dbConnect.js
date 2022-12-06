"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = (databaseURI) => {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(databaseURI, (err) => {
        if (err) {
            console.error('Error connecting to database: ' + err.message);
            return process.exit(1);
        }
        console.log('Connected to MongoDB Database.');
    });
};
exports.default = dbConnect;
