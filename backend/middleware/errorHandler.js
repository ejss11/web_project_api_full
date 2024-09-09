// middleware/errorHandler.js
import { errorLogger } from "./logger";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Registrar el error en error.log
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    url: req.url,
    method: req.method,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Se produjo un error inesperado";

  //Respuesta de error sin exponer detalles tecnicos innecesarios
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default errorHandler;
