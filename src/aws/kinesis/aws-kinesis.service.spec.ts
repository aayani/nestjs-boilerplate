import { Test, TestingModule } from '@nestjs/testing';
import { AwsKinesisService } from './aws-kinesis.service';

describe('AwsKinesisService', () => {
  let service: AwsKinesisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsKinesisService],
    }).compile();

    service = module.get<AwsKinesisService>(AwsKinesisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
