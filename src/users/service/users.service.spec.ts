import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dtp';

describe('UsersService', () => {
  let service: UsersService;

  const ModelMock = {
    find: jest.fn(() => [
      {
        _id: '60be6969e3fb9e5fe0a6b816',
        email: 'manolo@mail.com',
      },
      {
        _id: '60be6969e3fb9e5fe0a6b817',
        note: 'antonio@mail.com',
      },
    ]),

    findById: jest.fn(() => ({
      _id: '60be6969e3fb9e5fe0a6b816',
      email: 'manolo@mail.com',
      password: 'a12sadf83dflkghg2341234',
    })),

    create: jest.fn((dto: CreateUserDto) => {
      return {
        ...dto,
        _id: '60be6969e3fb9e5fe0a6b816',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('user'), useValue: ModelMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calling getUsers should return all users', async () => {
    const response = [
      {
        _id: '60be6969e3fb9e5fe0a6b816',
        email: 'manolo@mail.com',
      },
      {
        _id: '60be6969e3fb9e5fe0a6b817',
        note: 'antonio@mail.com',
      },
    ];

    const users = await service.getUsers();

    expect(users).toEqual(response);
  });

  it('calling getUser should return one user', async () => {
    const userId = '60be6969e3fb9e5fe0a6b816';
    const response = {
      _id: '60be6969e3fb9e5fe0a6b816',
      email: 'manolo@mail.com',
      password: 'a12sadf83dflkghg2341234',
    };

    const user = await service.getUser(userId);

    expect(user).toEqual(response);
  });

  it('calling createUser should return created user', async () => {
    const dto = {
      email: 'manolo@mail.com',
      password: '123456',
    };

    const user = await service.createUser(dto);

    expect(user).toEqual({
      _id: expect.any(String),
      email: 'manolo@mail.com',
    });
  });
});
