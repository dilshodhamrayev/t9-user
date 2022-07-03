import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty } from 'class-validator';

export class CompanyInfoDto{
    
    @IsNotEmpty()
    readonly legal_name : string;

    @IsNotEmpty()
    readonly phone : string;

    @IsNotEmpty()
    readonly address : string;

    @IsNotEmpty()
    readonly payment_account : string;

    @IsNotEmpty()
    readonly bank : string;

    @IsNotEmpty()
    readonly mfo : string;

    @IsNotEmpty()
    readonly inn : string;

    @IsNotEmpty()
    readonly oked : string;

    @IsNotEmpty()
    readonly leader : string;

    @IsNotEmpty()
    readonly responsible_person : string;

}