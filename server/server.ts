import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from './utils/dbConnect';
import User from './models/user';

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/react-auth-test-DB';
const SALT_ROUNDS = 10;
const JWT_SECRET = 'secret';

dbConnect(MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.post('/api/register', async (req, res) => {
  const body: { email: string; username: string; password: string } = req.body;

  if (!body.email || !body.username || !body.password)
    return res.status(400).json({
      success: false,
      error: 'Please include email, username, and password in request body.',
    });

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(body.password, salt);
    const newUser = new User({
      email: body.email,
      username: body.username,
      password: hash,
    });
    newUser.save((err, user) => {
      if (err)
        return res.status(400).json({ success: false, error: err.message });

      const jwt_token = jwt.sign(
        { _id: user._id, email: user.email },
        JWT_SECRET,
        { algorithm: 'HS256' }
      );

      return res.status(200).json({ success: true, token: jwt_token });
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
