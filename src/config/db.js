import mongoose from "mongoose";
import { config } from "./env.config.js";

const connectDB = async () => {
  await mongoose.connect(config.MONGODB_URI);
  console.log("MongoDB conectado");
};

export default connectDB;
