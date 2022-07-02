import { IsNotEmpty } from 'class-validator';

export class StickerDto {
  @IsNotEmpty()
  readonly type: number;

  @IsNotEmpty()
  readonly chance: number;

  @IsNotEmpty()
  readonly count: number;
}