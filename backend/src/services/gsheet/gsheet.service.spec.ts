import { Test, TestingModule } from '@nestjs/testing';
import { GsheetsService } from './gsheet.service';

describe('GsheetService', () => {
  let service: GsheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GsheetsService],
    }).compile();

    service = module.get<GsheetsService>(GsheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
