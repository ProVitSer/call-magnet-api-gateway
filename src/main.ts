import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';
import * as cookieParser from 'cookie-parser';
import httpsConfig from '@app/config/https.provider';
import { loadCorsConfiguration } from './config/cors.provider';
import { AllExceptionsFilter } from './common/exception-handler';

async function bootstrap() {
    const httpsOptions = httpsConfig();

    const app = await NestFactory.create(AppModule, {
        ...(httpsOptions ? { httpsOptions } : {}),
    });

    app.use(cookieParser());

    app.setGlobalPrefix(process.env.APP_PREFIX);

    app.useGlobalPipes(new GlobalValidationPipe());

    app.useGlobalFilters(new AllExceptionsFilter());

    app.enableCors(loadCorsConfiguration());

    await app.listen(process.env.APP_PORT);
}
bootstrap();
