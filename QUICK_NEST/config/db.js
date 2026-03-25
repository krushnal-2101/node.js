import mongoose  from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });
    console.log('MongoDB Connected ✅');
  } catch (err) {
    console.error('MongoDB Error ❌:', err.message);
    process.exit(1);
  }
};

 export default connectDB;