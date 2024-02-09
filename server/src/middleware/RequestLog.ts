import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        
        const logInfo = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            ip: req.ip,
            headers: req.headers,
            body: req.body,
            query: req.query,
            cookies: req.cookies,
            statusCode: res.statusCode,
            userAgent: req.headers['user-agent'],
            routeParameters: req.params,
            response: {
                statusCode: res.statusCode,
                responseTime: `${duration}ms`,
                responseSize: res.get('Content-Length'),
                errorMessage: (res as any).errorMessage
            }
        };

        if (logInfo.body && logInfo.body.password) {
            logInfo.body.password = '******';
        }

        console.log(JSON.stringify(logInfo, null, 2));
    });
    next();
};

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    (res as any).errorMessage = err.message;
    next(err);
};