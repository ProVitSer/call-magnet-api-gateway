import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';
import * as path from 'path';
import { AppProtocol } from './interfaces/config.enum';

export default (): HttpsOptions => {
    return (process.env.APP_PROTOCOL as AppProtocol) === AppProtocol.https
        ? {
              key: readFileSync(path.join(__dirname, './cert/private-key.pem')),
              cert: readFileSync(path.join(__dirname, './cert/public-certificate.crt')),
              ca: readFileSync(path.join(__dirname, './cert/chain.pem')),
          }
        : undefined;
};
