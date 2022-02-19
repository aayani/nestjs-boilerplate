import * as fs from 'fs'
import * as YAML from 'yaml'
import * as path from 'path'
import * as AWS from 'aws-sdk/lib/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigService {
  private config: any

  constructor() {
    if (!fs.existsSync(path.resolve('config', 'index.yaml'))) {
      throw new Error('Missing config file at config/index.yaml')
    }

    this.config = YAML.parse(
      fs.readFileSync(path.resolve('config', 'index.yaml')).toString(),
    )
  }

  get env(): string {
    return process.env.NODE_ENV
  }

  get port(): number {
    return this.config.port || 3000
  }

  get aws(): Partial<AWS.Config> {
    return this.config.aws
  }
}
