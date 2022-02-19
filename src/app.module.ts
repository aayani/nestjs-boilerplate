import { Module } from '@nestjs/common'

import { AwsModule } from './aws/aws.module'
import { AppController } from './app.controller'
import { ConfigModule } from './config/config.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [AwsModule, ConfigModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
