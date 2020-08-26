import { Module } from '@nestjs/common';

import { AwsModule } from './aws/aws.module';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AwsModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
