import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

import { AwsS3Service } from './s3/aws-s3.service';
import { ConfigService } from '../config/config.service';
import { AwsLambdaService } from './lambda/aws-lambda.service';
import { AwsKinesisService } from './kinesis/aws-kinesis.service';

@Injectable()
export class AwsService {
  constructor(
    readonly config: ConfigService,
    public readonly S3: AwsS3Service,
    public readonly Lambda: AwsLambdaService,
    public readonly Kinesis: AwsKinesisService,
  ) {
    AWS.config.update(config.aws);
  }
}
