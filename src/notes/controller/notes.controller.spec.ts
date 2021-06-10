import { Test, TestingModule } from '@nestjs/testing';
import { CreateNoteDto } from '../dto/create-note.dto';
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

    createNote: jest.fn((dto: CreateNoteDto) => ({
      ...dto,
      _id: '032498das2034',
    })),
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

  it('http get to root should return all the notes', async () => {
    const result = [
      {
        _id: '60be6969e3fb9e5fe0a6b816',
        note: 'me encanta trabajar con NestJs',
      },
      { _id: '60be6969e3fb9e5fe0a6b817', note: 'hacer TDD es lo más' },
    ];

    const notes = await controller.getNotes();

    expect(notes).toEqual(result);
  });

  it('http post to root shoutd return the new Note', async () => {
    const dto = {
      note: 'me encanta trabajar con NestJs',
    };

    const newNote = await controller.createNote(dto);

    expect(newNote).toEqual({
      note: 'me encanta trabajar con NestJs',
      _id: expect.any(String),
    });
  });
});
