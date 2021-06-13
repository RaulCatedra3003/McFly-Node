import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { ValidateUserDto } from '../dto/validate-user.dto';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../dto/signup.dto';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}
  async logIn(user: any) {
    return `loged correctly with: ${user._id}`;
  }

  async validateUser(validateUserDto: ValidateUserDto) {
    const user = await this.userService.getUserByEmail(validateUserDto.email);

    if (user) {
      const isValid = await bcrypt.compare(
        validateUserDto.password,
        user.password,
      );

      if (isValid) {
        const { _id } = user;
        return { _id };
      } else {
        return null;
      }
    }

    return null;
  }

  async signUp(singUpDto: SignUpDto) {
    try {
      return this.userService.createUser(singUpDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
