import mongoose from "mongoose";
import { config } from "./env.config.js";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("MongoDB conectado");
  } catch (error) {
    logger.fatal(`Error al conectar con MongoDB: ${error.message}`, { stack: error.stack });
    throw error;
  }
};

export default connectDB;
