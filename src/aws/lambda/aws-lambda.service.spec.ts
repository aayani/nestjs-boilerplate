import { Test, TestingModule } from '@nestjs/testing';
import { AwsLambdaService } from './aws-lambda.service';

describe('AwsLambdaService', () => {
  let service: AwsLambdaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsLambdaService],
    }).compile();

    service = module.get<AwsLambdaService>(AwsLambdaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
