import { isEmpty, IsNotEmpty } from 'class-validator';

export class CategoryDto {

  @IsNotEmpty()
  readonly title_uz: string;
  @IsNotEmpty()
  readonly title_ru: string;

  readonly status?: boolean;
 
  readonly title_en?: string;
  
  readonly image?: string;
  
  readonly file?: string;

  readonly level? : number;

  readonly priority? : number;

  readonly parent_id? : number;

}