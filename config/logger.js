const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

const isProduction = process.env.NODE_ENV === 'production';

// Custom format that handles both HTTP request logs and general logs
const customFormat = printf((info) => {
  const { level, message, timestamp, stack, method, url, status, responseTime } = info;

  // HTTP request log (morgan-like)
  if (method && url) {
    const statusColor = status < 400 ? '\x1b[32m' : status < 500 ? '\x1b[33m' : '\x1b[31m';
    const reset = '\x1b[0m';
    return `${level} ${method} ${url} ${statusColor}${status}${reset} \x1b[90m${responseTime}ms${reset}`;
  }

  // General log
  const msg = stack || message;
  return timestamp ? `${timestamp} ${level}: ${msg}` : `${level}: ${msg}`;
});

const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        customFormat
      )
    })
  ]
});

// HTTP request logger middleware (morgan replacement)
const httpLogger = (req, res, next) => {
  const start = Date.now();

  // Capture original end method
  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      responseTime: duration
    };

    if (res.statusCode >= 500) {
      logger.error('request', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('request', logData);
    } else {
      logger.info('request', logData);
    }

    originalEnd.apply(res, args);
  };

  next();
};

module.exports = { logger, httpLogger };
