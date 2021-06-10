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
        likedBy: ['60be6969e3fb9e5fe0a6b816'],
      },
      {
        _id: '60be6969e3fb9e5fe0a6b817',
        note: 'hacer TDD es lo más',
        likedBy: ['60be6969e3fb9e5fe0a6b816'],
      },
    ]),

    create: jest.fn((dto: CreateNoteDto) => ({
      ...dto,
      _id: '12348934osdaa12345143',
      likedBy: [],
    })),

    findOne: jest.fn(() => ({
      _id: '60be6969e3fb9e5fe0a6b816',
      note: 'me encanta trabajar con NestJs',
      likedBy: [],
    })),

    findOneAndUpdate: jest.fn((queryFind, querySet) => ({
      _id: queryFind._id,
      note: 'me encanta trabajar con NestJs',
      likedBy: [querySet.$push.likedBy],
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
        likedBy: ['60be6969e3fb9e5fe0a6b816'],
      },
      {
        _id: '60be6969e3fb9e5fe0a6b817',
        note: 'hacer TDD es lo más',
        likedBy: ['60be6969e3fb9e5fe0a6b816'],
      },
    ];

    const notes = await service.getNotes();

    expect(notes).toEqual(response);
  });

  it('calling getNote should return one note', async () => {
    const noteId = '60be6969e3fb9e5fe0a6b816';
    const response = {
      _id: '60be6969e3fb9e5fe0a6b816',
      note: 'me encanta trabajar con NestJs',
      likedBy: [],
    };

    const note = await service.getNote(noteId);

    expect(note).toEqual(response);
  });

  it('calling createNote should return created note', async () => {
    const dto = {
      note: 'me encanta trabajar con NestJs',
    };

    const note = await service.createNote(dto);

    expect(note).toEqual({
      note: 'me encanta trabajar con NestJs',
      _id: expect.any(String),
      likedBy: [],
    });
  });

  it('calling likeNote should return note with userId inside likedBy array', async () => {
    const dto = {
      userId: '60be6969e3fb9e5fe0a6b816',
      noteId: '60be6969e3fb9e5fe0a6b817',
    };

    const note = await service.likeNote(dto);

    expect(note).toEqual({
      note: expect.any(String),
      _id: dto.noteId,
      likedBy: expect.arrayContaining([dto.userId]),
    });
  });

  it('calling likesNotes should return all the user liked notes', async () => {
    const userId = '60be6969e3fb9e5fe0a6b816';

    const note = await service.getLikedNotes(userId);

    expect(note).toEqual(
      expect.arrayContaining([
        {
          note: expect.any(String),
          _id: expect.any(String),
          likedBy: expect.arrayContaining([userId]),
        },
      ]),
    );
  });
});
