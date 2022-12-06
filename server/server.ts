import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dbConnect from './utils/dbConnect';

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/react-auth-test-DB';

dbConnect(MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.get('/api/test', (req, res) => {
  return res.status(200).json({
    username: 'bobjones24',
    email: 'bobjones24@yahoo.com',
    password: 'password',
  });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
