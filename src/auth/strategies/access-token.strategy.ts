import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

export type JwtPayload = {
    sub: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_AT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.findUserByClientId(payload.sub);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            ...user,
            ...payload,
        };
    }
}
