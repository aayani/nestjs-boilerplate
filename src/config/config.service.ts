import * as fs from 'fs'
import * as dotenv from 'dotenv'
import * as AWS from 'aws-sdk/lib/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigService {
  constructor() {
    if (fs.existsSync('.env')) {
      dotenv.config()
    }
  }

  get env(): string {
    return process.env.NODE_ENV
  }

  get port(): number {
    return Number(process.env.PORT) || 3000
  }

  get aws(): Partial<AWS.Config> {
    return {
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }
  }
}
