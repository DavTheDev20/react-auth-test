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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const user_1 = __importDefault(require("./models/user"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/react-auth-test-DB';
const SALT_ROUNDS = 10;
const JWT_SECRET = 'secret';
(0, dbConnect_1.default)(MONGODB_URI);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body.email || !body.username || !body.password)
        return res.status(400).json({
            success: false,
            error: 'Please include email, username, and password in request body.',
        });
    try {
        const salt = yield bcrypt_1.default.genSalt(SALT_ROUNDS);
        const hash = yield bcrypt_1.default.hash(body.password, salt);
        const newUser = new user_1.default({
            email: body.email,
            username: body.username,
            password: hash,
        });
        newUser.save((err, user) => {
            if (err)
                return res.status(400).json({ success: false, error: err.message });
            const jwt_token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, JWT_SECRET, { algorithm: 'HS256' });
            return res.status(200).json({ success: true, token: jwt_token });
        });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}));
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
