import * as AWS from 'aws-sdk'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigService {
  get env(): string {
    return process.env.NODE_ENV
  }

  get port(): number {
    return Number(process.env.NODE_ENV) || 3000
  }

  get aws(): Partial<AWS.Config> {
    return {
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_CREDENTIALS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_CREDENTIALS_SECRET_ACCESS_KEY,
      },
    }
  }
}
