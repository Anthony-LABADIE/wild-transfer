import { Request, Response, NextFunction } from 'express';
import logger from '../Logger';
class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly details?: any;
    public readonly name: string;

    constructor(name: string, message: string, statusCode = 400, details?: any) {
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.details = details;
    }
}

const errorMiddleware = (error: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${error.statusCode || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    const status = error.statusCode || 500;
    const message = error.message || 'Erreur interne du serveur';
    const details = error.details || null;
    const name = error.name || 'ServerError';

    const errorResponse = {
        status: 'error',
        statusCode: status,
        message: message,
        ...(process.env.NODE_ENV === 'development' && {
            details: details,
            name: name,
        }),
    };

    //@ts-ignore
    res.status(status).json(errorResponse);
};

export { AppError, errorMiddleware };
