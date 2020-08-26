import { Module } from '@nestjs/common';

import { AwsService } from './aws.service';
import { AwsS3Service } from './s3/aws-s3.service';
import { AwsLambdaService } from './lambda/aws-lambda.service';
import { AwsKinesisService } from './kinesis/aws-kinesis.service';

@Module({
  providers: [AwsKinesisService, AwsLambdaService, AwsS3Service, AwsService],
  exports: [AwsService],
})
export class AwsModule {}
