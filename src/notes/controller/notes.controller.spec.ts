import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../service/notes.service';
import { NotesController } from './notes.controller';

describe('NotesController', () => {
  let controller: NotesController;

  const mockNoteService = {
    getNotes: jest.fn(() => [
      {
        _id: '60be6969e3fb9e5fe0a6b816',
        note: 'me encanta trabajar con NestJs',
      },
      { _id: '60be6969e3fb9e5fe0a6b817', note: 'hacer TDD es lo más' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    })
      .overrideProvider(NotesService)
      .useValue(mockNoteService)
      .compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('http get to root should return all the notes', () => {
    const result = [
      {
        _id: '60be6969e3fb9e5fe0a6b816',
        note: 'me encanta trabajar con NestJs',
      },
      { _id: '60be6969e3fb9e5fe0a6b817', note: 'hacer TDD es lo más' },
    ];

    expect(controller.getNotes()).toBe(result);
  });
});
