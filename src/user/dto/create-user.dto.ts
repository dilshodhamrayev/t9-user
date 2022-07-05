import { isEmpty, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly lname: string;
  
  @IsNotEmpty()
  readonly fname: string;

  @IsNotEmpty()
  readonly sms_code: string;

  @IsNotEmpty()
  readonly birthday: string;

  @IsNotEmpty()
  readonly region_id: string;

  @IsNotEmpty()
  readonly region_child_id: string;

  @IsNotEmpty()
  readonly fatvo: string;

  @IsNotEmpty()
  readonly prize: string;
    
}