import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'First Name is required'})
    @ApiProperty({
        description: 'User first name',
        example: 'Daniel'
    })
    firstName: string;

    @IsNotEmpty({message: 'Last Name is required'})
    @ApiProperty({
        description: 'User lastname',
        example: 'Fola'
    })
    lastName: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    @ApiProperty({
        description: 'User email',
        example: 'danielfola@gmail.com'
    })
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @ApiProperty({
        description: 'User password',
        example: 'D@niel4ola'
    })
    @MinLength(8)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ ,{
         message: "Password should contain atleast a capital letter,small letter,number and special character,And must be at least 8 characters long"
        })
    password: string;
}
