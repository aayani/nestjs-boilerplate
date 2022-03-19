import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'

import { AppInfo } from './common/dtos/app-info.dto'
import { ConfigService } from './config/config.service'

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  @ApiTags()
  public getInfo(): AppInfo {
    return this.config.appInfo
  }

  @Get('health')
  @ApiTags('health')
  public getHealth(): { healthy: boolean } {
    return { healthy: true }
  }
}
