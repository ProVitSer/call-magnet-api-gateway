import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function loadCorsConfiguration(): CorsOptions {
    const cosrOptions: CorsOptions = {
        allowedHeaders:
            'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Authorization',
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
        origin: '*',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        maxAge: 3600,
    };

    return cosrOptions;
}
