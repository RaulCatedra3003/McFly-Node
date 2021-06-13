import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../service/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('http get to root should call getUsers function from Users Service', () => {
    controller.getUsers();
    expect(mockUsersService.getUsers).toHaveBeenCalled();
  });

  it('http get to /:userId should call getUser function from Users Service', () => {
    const userId = '60be6969e3fb9e5fe0a6b816';
    controller.getUser(userId);
    expect(mockUsersService.getUser).toHaveBeenCalled();
  });
});
