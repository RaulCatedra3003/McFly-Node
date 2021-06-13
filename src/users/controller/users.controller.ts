import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { MongoDbObjectIdPipe } from '../../pipes/mongodb-object-id.pipe';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    try {
      return this.usersService.getUsers();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:userId')
  async getUser(@Param('userId', MongoDbObjectIdPipe) userId: string) {
    try {
      const user = await this.usersService.getUser(userId);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
