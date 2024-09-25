import { Test, TestingModule } from '@nestjs/testing';
import { RsvpsController } from './rsvps.controller';

describe('RsvpsController', () => {
  let controller: RsvpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RsvpsController],
    }).compile();

    controller = module.get<RsvpsController>(RsvpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
