import { isEmpty, IsNotEmpty } from 'class-validator';

export class ProductDto {

  @IsNotEmpty()
  readonly title: string;
  
  readonly image?: string;
  
  readonly file?: string;

  @IsNotEmpty()
  readonly company_id: number;

  @IsNotEmpty()
  readonly brand_id: number;

  @IsNotEmpty()
  readonly category_id: number;
  
  @IsNotEmpty()
  readonly sticker_count: number;
  
  @IsNotEmpty()
  readonly sticker_active_count: number;
}