import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto{
    
    @ApiProperty({example:"936888499",description:"Telefon raqam"})
    @IsNotEmpty()
    readonly username : string;
    
    @IsNotEmpty()
    @ApiProperty({example:"123456",description:"Parol"})
    readonly password_hash : string;
    
    @ApiProperty({example:"Eshonov Boxodir Smadovich",description:"F.I.O"})
    @IsNotEmpty()
    readonly full_name : string;
    
    readonly position : string;

    readonly status : number;
    
    readonly region_id : number;
    
    readonly sticker_count : number;

    readonly active_sticker_count : number;
    
    readonly auth_key : string;
    
    readonly created_at : string;
}