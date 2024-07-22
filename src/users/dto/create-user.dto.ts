import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator"


export class CreateUserDto {
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
    @IsStrongPassword()
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
