import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = '';

        switch (exception.constructor) {
            case HttpException:
                httpStatus = (exception as HttpException).getStatus();
                message = Array.isArray(exception?.response)
                    ? exception?.response
                    : exception?.response?.error || exception?.message || 'Internal server error';
                break;
            case RpcException:
                const error: any = exception.getError();

                httpStatus = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
                message = error?.message || 'RpcException';
                break;
            default:
                if ('Rpc Exception' === exception.message) {
                    httpStatus = exception?.error?.code || HttpStatus.INTERNAL_SERVER_ERROR;
                    message = exception?.error?.message?.error || 'Internal server error';
                } else {
                    httpStatus =
                        exception.response?.status ||
                        exception.response?.statusCode ||
                        exception.code ||
                        exception.statusCode ||
                        HttpStatus.INTERNAL_SERVER_ERROR;
                    message =
                        exception.response?.data?.message || exception.response?.message || exception?.message || 'Internal server error';
                }

                if (!this.isHttpErrorStatus(httpStatus)) {
                    httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                }
        }

        const responseBody = {
            statusCode: httpStatus,
            message,
            error: exception.message,
        };
        response.status(httpStatus).json(responseBody);
    }

    isHttpErrorStatus(statusCode: number): boolean {
        return Object.values(HttpStatus).includes(statusCode);
    }
}
