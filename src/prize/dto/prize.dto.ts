import { isEmpty, IsNotEmpty } from 'class-validator';

export class PrizeDto {

  @IsNotEmpty()
  readonly title_ru: string;

  @IsNotEmpty()
  readonly title_uz: string;

  readonly title_en: string;
  
  @IsNotEmpty()
  readonly count: number;

  readonly status?: number;


  @IsNotEmpty()
  readonly type: any;

  readonly image?: string;

  @IsNotEmpty()
  readonly raffle_date: string;
 
  readonly created_date?: string;
  
  readonly file?: string;

  @IsNotEmpty()
  readonly company_id: number;
}