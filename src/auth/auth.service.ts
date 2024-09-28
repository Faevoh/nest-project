import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        if(!user){
            throw new NotFoundException('Not a User');
        }
        const Password = await bcrypt.compare(password, user.password);
        if(!Password){
            throw new UnauthorizedException('Wrong User Credencials')
        }
        return user;
    }

    async login(user) {
        const payload = {email: user.email, sub: user.id}
        return {
            status: 201,
            message: 'Successfully looged in',
            access_token: this.jwtService.sign(payload)
        }
    }
}
