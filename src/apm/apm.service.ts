import * as APM from 'elastic-apm-node'
import { Injectable } from '@nestjs/common'

import { ConfigService } from '../config/config.service'

@Injectable()
export class ApmService {
  private agent: typeof APM

  constructor(readonly config: ConfigService) {
    this.agent = APM.start({
      active:
        config.env === 'staging' ||
        config.env === 'development' ||
        config.env === 'production',
    })
  }

  public captureError(err: string | Error): void {
    this.agent.captureError(err)
  }

  public startTransaction(
    name: string,
    type: string,
  ): typeof APM.currentTransaction {
    return this.agent.startTransaction(name, type)
  }
}
