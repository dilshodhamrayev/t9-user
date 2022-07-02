import { isEmpty, IsNotEmpty } from 'class-validator';

export class ReleaseDto {

  @IsNotEmpty()
  readonly from_id: string;

  @IsNotEmpty()
  readonly to_id: string;

  @IsNotEmpty()
  readonly status: number;

  @IsNotEmpty()
  readonly count: number;

  @IsNotEmpty()
  readonly chance: number;

  @IsNotEmpty()
  readonly created_at: string;

  readonly amount_paid?: number;
  readonly sticker_price?: number;
  readonly product_price?: number;
  readonly brand_id?: number;
  readonly category_id?: number;
  readonly product_id?: number;
  readonly company_id?: number;
  readonly expire_date?: string;
}