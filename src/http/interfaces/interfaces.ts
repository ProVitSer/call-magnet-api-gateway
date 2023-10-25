import { DataObject } from '@app/platform-types/common/interfaces';
import { HttpStatus } from '@nestjs/common';

export class HttpResponse<T> {
    statusCode: HttpStatus;
    message?: string | string[] | any;
    result?: boolean;
    errors?: string | DataObject;
    data?: T;
    path: string;
    timestamp: string;
    createdBy: string;
}
