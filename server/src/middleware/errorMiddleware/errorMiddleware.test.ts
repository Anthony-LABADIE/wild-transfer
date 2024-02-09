import { AppError, errorMiddleware } from './errorMiddleware ';
import { Request, Response, NextFunction } from 'express';

describe('Middleware d\'erreur', () => {
  it('devrait renvoyer une réponse JSON avec le message d\'erreur et le code d\'état', () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext: NextFunction = jest.fn();

    //@ts-ignore
    const error = new AppError('Ressource non trouvée', 404);
    errorMiddleware(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      statusCode: 404,
      message: 'Ressource non trouvée',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});