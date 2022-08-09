import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisingConnectController } from './advertisingConnect.controller';

describe('AdvertisingConnectController', () => {
  let controller: AdvertisingConnectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertisingConnectController],
    }).compile();

    controller = module.get<AdvertisingConnectController>(AdvertisingConnectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
