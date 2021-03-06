import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../service/notes.service';
import { NotesController } from './notes.controller';

describe('NotesController', () => {
  let controller: NotesController;

  const mockNoteService = {
    getNotes: jest.fn(),
    createNote: jest.fn(),
    getNote: jest.fn(),
    likeNote: jest.fn(),
    getLikedNotes: jest.fn(),
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

  it('call getNotes should call getNotes function from Notes Service', () => {
    controller.getNotes();
    expect(mockNoteService.getNotes).toHaveBeenCalled();
  });

  it('call getNote should call getNote function from Notes Service', () => {
    const noteId = '60be6969e3fb9e5fe0a6b816';
    controller.getNote(noteId);
    expect(mockNoteService.getNote).toHaveBeenCalled();
  });

  it('call createNote shoutd call createNote function from Notes Service', () => {
    const dto = {
      note: 'me encanta trabajar con NestJs',
    };
    controller.createNote(dto);

    expect(mockNoteService.createNote).toHaveBeenCalled();
  });

  /* it('call likeNote shoutd call likeNote function from Notes Service', () => {
    const dto = {
      userId: '60be6969e3fb9e5fe0a6b816',
      noteId: '60be6969e3fb9e5fe0a6b817',
    };
    controller.likeNote(dto);

    expect(mockNoteService.likeNote).toHaveBeenCalled();
  }); */

  it('call getLikedNotes shoutd call likedNotes function from Notes Service', () => {
    const userId = '60be6969e3fb9e5fe0a6b816';
    controller.getLikedNotes(userId);

    expect(mockNoteService.getLikedNotes).toHaveBeenCalled();
  });
});
