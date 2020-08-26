import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ConfigurationOptions, APIVersions } from 'aws-sdk/lib/config';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

@Injectable()
export class ConfigService {
  constructor() {
    if (fs.existsSync('.env')) {
      dotenv.config();
    }
  }

  get env(): string {
    return process.env.NODE_ENV;
  }

  get port(): number {
    return Number(process.env.PORT) || 3000;
  }

  get aws(): ConfigurationOptions &
    ConfigurationServicePlaceholders &
    APIVersions {
    return {
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }
}
