import logger from "../config/logger.js";

export const httpLoggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs}ms`);
  });

  next();
};
