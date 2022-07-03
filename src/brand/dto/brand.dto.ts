import { isEmpty, IsNotEmpty } from 'class-validator';

export class BrandDto {

  @IsNotEmpty()
  readonly name: string;
  
  readonly image?: string;
  
  readonly file?: string;

  @IsNotEmpty()
  readonly company_id: number;
}