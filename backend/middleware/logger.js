//middleware/logger.js
import { createLogger, format, transports } from "winston";
import path from "path";

// Formato de los logs en JSON
const logFormat = format.combine(format.timestamp(), format.json());

// Logger para las solicitudes
export const requestLogger = createLogger({
  level: "info", // Para Registrar informacion general
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../logs/request.log"),
    }),
  ],
});

// Logger para los Errores
export const errorLogger = createLogger({
  level: "error", // Solo registrar errores
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
    }),
  ],
});
