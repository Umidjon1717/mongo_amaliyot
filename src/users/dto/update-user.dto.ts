import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    id:string
    
    @IsString()
    @IsNotEmpty()
    username:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    role:string

    @IsNotEmpty()
    isVerified:boolean

    @IsOptional()
    createdAt:Date

    @IsOptional()
    updatedAt:Date
}
