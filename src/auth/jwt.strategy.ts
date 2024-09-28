import { Injectable, UnauthorizedException } from "@nestjs/common";
import { config } from "dotenv";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET
        });
    }

    async validate(payload) {
        return {
            userId: payload.sub,
            email: payload.email
        }
    }

   
}