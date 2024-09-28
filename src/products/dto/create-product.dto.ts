import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message: 'Product name is required'})
    @ApiProperty({
        example: 'Stick Notes'
    })
    name: string;

    @IsNotEmpty({message: 'Product description is required'})
    @ApiProperty({
        example: '100 pieces of coloured sticky notes'
    })
    description: string;

    @IsNotEmpty({message: 'Product price is required'})
    @IsDecimal()
    @ApiProperty({
        example: '3500.00'
    })
    price: string;
}
