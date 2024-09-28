import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Stella'
    })
    firstName? : string;

    @IsOptional()
    @ApiPropertyOptional({
        example: 'Stanley'
    })
    lastName?: string;
}
