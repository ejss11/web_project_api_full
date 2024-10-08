// middleware/requestLogger.js
import { requestLogger } from "./logger.js";

export const logRequests = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
};
