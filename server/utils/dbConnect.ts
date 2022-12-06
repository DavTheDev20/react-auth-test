import mongoose from 'mongoose';

const dbConnect = (databaseURI: string) => {
  mongoose.set('strictQuery', false);
  mongoose.connect(databaseURI, (err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.message);
      return process.exit(1);
    }

    console.log('Connected to MongoDB Database.');
  });
};

export default dbConnect;
