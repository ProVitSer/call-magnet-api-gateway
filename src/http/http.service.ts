import { DataObject } from '@app/platform-types/common/interfaces';
import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpResponse } from './interfaces/interfaces';

export class HttpResponseService {
    private static path: string;

    public static response<T>(req: Request, res: Response, status: HttpStatus, data?: any): Response {
        this.path = req.url;
        const response = this.getResponseStruct<T>(status, true, data);
        return res.status(response.statusCode).json(response);
    }

    private static getResponseStruct<T>(status: number, result: boolean, data?: string | DataObject, error?: object): HttpResponse<T> {
        const dataResponse = !!data ? { data } : {};
        const errorResponse = !!error ? { error } : {};

        const jsonResponse: HttpResponse<T> = {
            statusCode: status,
            result,
            ...(dataResponse as T),
            ...errorResponse,
            path: this.path,
            timestamp: new Date().toISOString(),
            createdBy: 'VPNP',
        };

        return jsonResponse;
    }
}
