import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  const ModelMock = {
    find: jest.fn(() => [
      {
        _id: '60be6969e3fb9e5fe0a6b816',
        note: 'me encanta trabajar con NestJs',
      },
      { _id: '60be6969e3fb9e5fe0a6b817', note: 'hacer TDD es lo más' },
    ]),

    create: jest.fn((dto: CreateNoteDto) => ({
      ...dto,
      _id: '12348934osdaa12345143',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getModelToken('note'),
          useValue: ModelMock,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calling getNotes should return all notes', async () => {
    const response = [
      {
        _id: '60be6969e3fb9e5fe0a6b816',
        note: 'me encanta trabajar con NestJs',
      },
      { _id: '60be6969e3fb9e5fe0a6b817', note: 'hacer TDD es lo más' },
    ];

    const notes = await service.getNotes();

    expect(notes).toEqual(response);
  });

  it('calling createNote should return created note', async () => {
    const dto = {
      note: 'me encanta trabajar con NestJs',
    };

    const notes = await service.createNote(dto);

    expect(notes).toEqual({
      note: 'me encanta trabajar con NestJs',
      _id: expect.any(String),
    });
  });
});
