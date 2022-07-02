import { isEmpty, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly lname: string;
  
  @IsNotEmpty()
  readonly fname: string;

  @IsNotEmpty()
  readonly password_hash: string;

  @IsNotEmpty()
  readonly generated_id: string;
}