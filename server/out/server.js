"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/react-auth-test-DB';
(0, dbConnect_1.default)(MONGODB_URI);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/api/test', (req, res) => {
    return res.status(200).json({
        username: 'bobjones24',
        email: 'bobjones24@yahoo.com',
        password: 'password',
    });
});
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
