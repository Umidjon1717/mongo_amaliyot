import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
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
