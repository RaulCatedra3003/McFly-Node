import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../service/authentication.service';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  const mockAuthService = {
    validateUser: jest.fn(),
    signUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      imports: [AuthenticationService],
    })
      .overrideProvider(AuthenticationService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('call logIn should call validateUser function from Authentication Service', () => {
    const dto = {
      email: 'manolo@mail.com',
      password: '123456',
    };
    controller.logIn(dto);
    expect(mockAuthService.validateUser).toHaveBeenCalled();
  });

  it('call signUo should call signUp function from Authentication Service', () => {
    const dto = {
      email: 'manolo@manolo.com',
      password: '123456',
    };
    controller.signUp(dto);
    expect(mockAuthService.signUp).toHaveBeenCalled();
  });
});
