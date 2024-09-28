import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateRoleDto {
    @IsNotEmpty({message: 'Please input a role'})
    @ApiProperty({
        example: 'admin'
    })
    role: string;
}