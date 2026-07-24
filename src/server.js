import { config } from "./config/env.config.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      logger.info(`Servidor escuchando en el puerto ${config.PORT}`);
    });
  } catch (error) {
    logger.fatal(`Error crítico al iniciar el servidor: ${error.message}`, { stack: error.stack });
    process.exit(1);
  }
};

startServer();
