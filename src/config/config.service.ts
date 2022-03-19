import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import * as dotenv from 'dotenv'
import { Injectable } from '@nestjs/common'

import { AppInfo } from '../common/dtos/app-info.dto'

@Injectable()
export class ConfigService {
  private pJson: any

  constructor() {
    dotenv.config()
    this.pJson = JSON.parse(fs.readFileSync('package.json').toString())
  }

  get startupMessage(): string {
    const { env, url, name, version } = this.appInfo

    return `${name} ${version} running at ${url} in "${env}" mode`
  }

  get globalApiPrefix(): string | undefined {
    return process.env.GLOBAL_API_PREFIX ?? ''
  }

  get apiDocsUrl(): string {
    return this.globalApiPrefix + '/docs'
  }

  get appInfo(): AppInfo {
    const { name, version, description } = this.pJson

    return {
      name,
      version,
      description,
      env: this.env,
      port: this.port,
      host: 'localhost',
      url:
        new URL(`http://localhost:${this.port}`).toString() +
        this.globalApiPrefix,
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
        accessKeyId: process.env.AWS_CREDENTIALS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_CREDENTIALS_SECRET_ACCESS_KEY,
      },
    }
  }

  get kafka(): { brokers: string[] } {
    return { brokers: process.env.KAFKA_BROKERS.split(',') }
  }
}
