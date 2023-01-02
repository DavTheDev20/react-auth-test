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
app.use(cors({ credentials: true }));

app.post('/api/register', async (req, res) => {
  const body: {
    email: string;
    username: string;
    password: string;
    name: string;
  } = req.body;

  if (!body.email || !body.username || !body.password || !body.name)
    return res.status(400).json({
      success: false,
      error:
        'Please include email, username, password, and name in request body.',
    });

  if (await User.findOne({ email: body.email }))
    return res
      .status(400)
      .json({ success: false, error: 'User already exists with that email.' });

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(body.password, salt);
    const newUser = new User({
      email: body.email,
      username: body.username,
      password: hash,
      name: body.name,
    });
    newUser.save((err, user) => {
      if (err)
        return res.status(400).json({ success: false, error: err.message });

      const jwt_token: string = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { algorithm: 'HS256' }
      );
      return res
        .status(200)
        .json({ success: true, token: jwt_token, name: user.name });
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const body: { email: string; password: string } = req.body;

  if (!body.email || !body.password)
    return res.status(400).json({
      success: false,
      error: 'Please include email and password in request body.',
    });

  const currentUser = await User.findOne({ email: body.email });

  if (!currentUser)
    return res
      .status(400)
      .json({ success: false, error: 'No user found, please register.' });

  bcrypt
    .compare(body.password, currentUser.password)
    .then((isPasswordCorrect) => {
      if (isPasswordCorrect === true) {
        const jwt_token: string = jwt.sign(
          {
            id: currentUser._id,
            email: currentUser.email,
            name: currentUser.name,
          },
          JWT_SECRET,
          { algorithm: 'HS256' }
        );
        return res
          .status(200)
          .json({ success: true, token: jwt_token, name: currentUser.name });
      } else {
        return res
          .status(401)
          .json({ success: false, error: 'Incorrect password' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

app.post('/api/verify', (req, res) => {
  const token = req.body.token;

  if (!token)
    return res
      .status(400)
      .json({ success: false, error: 'No token present in body.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
