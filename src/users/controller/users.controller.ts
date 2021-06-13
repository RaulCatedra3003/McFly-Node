import { Controller, Get, Param } from '@nestjs/common';
import { MongoDbObjectIdPipe } from 'src/notes/pipes/mongodb-object-id.pipe';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {}

  @Get('/:userId')
  async getUser(@Param('userId', MongoDbObjectIdPipe) userId: string) {}
}
