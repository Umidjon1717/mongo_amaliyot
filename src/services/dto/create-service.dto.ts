import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateServiceDto {
    @IsOptional()
    id:string

    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsDate()
    @IsOptional()
    createdAt: Date

    @IsDate()
    @IsOptional()
    updatedAt: Date
}
