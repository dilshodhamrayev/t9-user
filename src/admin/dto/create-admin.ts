import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty } from 'class-validator';

export class CreateAdminDto{
    @ApiProperty({example:"936888499",description:"Telefon raqam"})
    readonly username : string;
    @IsNotEmpty()
    @ApiProperty({example:"123456",description:"Parol"})
    readonly password_hash : string;
    @ApiProperty({example:"Eshonov Boxodir Smadovich",description:"F.I.O"})
    @IsNotEmpty()
    readonly full_name : string;
    @IsNotEmpty()
    readonly status : number;
    @IsNotEmpty()
    readonly auth_key : string;
    @IsNotEmpty()
    readonly created_at : string;
}