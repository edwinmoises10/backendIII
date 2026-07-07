import "dotenv/config";

const REQUIRED_VARS = ["MONGODB_URI"];

for (const varName of REQUIRED_VARS) {
  if (!process.env[varName]) {
    throw new Error(
      `[Config] Variable de entorno requerida faltante: "${varName}". Revisa tu archivo .env`
    );
  }
}

export const config = Object.freeze({
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV || "development"
});
