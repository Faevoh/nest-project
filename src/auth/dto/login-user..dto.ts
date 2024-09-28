import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty({message: 'Product name is required'})
    @ApiProperty({
        description: 'User email',
        example: 'danielfola@gmail.com'
    })
    email: string;

    @IsNotEmpty({message: 'Product description is required'})
    @ApiProperty({
        description: 'User password',
        example: 'D@niel4ola'
    })
    password: string;
}