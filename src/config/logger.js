import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import { config } from "./env.config.js";

const LEVELS = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5
};

const COLORS = {
  fatal: "bold red",
  error: "red",
  warning: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue"
};

winston.addColors(COLORS);

const isProduction = config.NODE_ENV === "production";
const level = isProduction ? "info" : "debug";

const logsDir = path.resolve("logs");

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level: logLevel, message, stack }) =>
      `[${timestamp}] ${logLevel}: ${stack || message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Guarda fatal + error para poder auditar fallas graves después de ocurridas.
const errorRotateTransport = new DailyRotateFile({
  dirname: logsDir,
  filename: "error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxFiles: "14d",
  zippedArchive: true,
  format: fileFormat
});

// Historial completo (según el nivel activo del entorno) con la misma rotación.
const combinedRotateTransport = new DailyRotateFile({
  dirname: logsDir,
  filename: "combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level,
  maxFiles: "14d",
  zippedArchive: true,
  format: fileFormat
});

const logger = winston.createLogger({
  levels: LEVELS,
  level,
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    errorRotateTransport,
    combinedRotateTransport
  ]
});

export default logger;
