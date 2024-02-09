import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const consoleFormat = winston.format.combine(winston.format.colorize(), winston.format.simple());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: consoleFormat,
        })
    );
} else {
    logger.add(new winston.transports.File({ filename: path.join(logDir, 'combined.log') }));
}

logger.add(
    new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
    })
);

logger.exceptions.handle(new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') }));

export default logger;
