import { config } from "./config/env.config.js";
import app from "./app.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${config.PORT}`);
    });
  } catch (error) {
    console.error(`Error al iniciar el servidor: ${error.message}`);
    process.exit(1);
  }
};

startServer();
