import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticationService } from '../service/authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logIn(@Request() req: any) {
    try {
      return this.authService.logIn(req.user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      return this.authService.signUp(signUpDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
