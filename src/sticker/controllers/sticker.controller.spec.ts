import { Test, TestingModule } from '@nestjs/testing';
import { StickerController } from './sticker.controller';

describe('StickerController', () => {
  let controller: StickerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StickerController],
    }).compile();

    controller = module.get<StickerController>(StickerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
