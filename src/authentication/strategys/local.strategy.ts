import * as passportStrategy from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(passportStrategy.Strategy) {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser({
      email: username,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
