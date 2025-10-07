import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/password_vault`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting MongoDB", error.message);
    process.exit(1);
  }
};

export default connectDB;