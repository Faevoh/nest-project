import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Portable laptop bag'
    })
    name?: string;

    @IsOptional()
    @ApiPropertyOptional({
        example: 'A portable laptop bag in shades of blue, grey and lack'
    })
    description?: string;

    @IsOptional()
    @ApiPropertyOptional({
        example: '9000.00'
    })
    price?: string;
}
