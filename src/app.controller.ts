import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get('health')
  @ApiTags('health')
  getHealth(): string {
    return `API running at http://localhost:${this.config.port} in "${this.config.env}" mode`;
  }
}
