import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../service/notes.service';
import { NotesController } from './notes.controller';

describe('NotesController', () => {
  let controller: NotesController;

  const mockNoteService = {
    getNotes: jest.fn(),
    createNote: jest.fn(),
    getNote: jest.fn(),
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

  it('http get to root should call getNotes function from Notes Service', async () => {
    controller.getNotes();
    expect(mockNoteService.getNotes).toHaveBeenCalled();
  });

  it('http get to /:noteId should call getNote function from Notes Service', async () => {
    controller.getNote();
    expect(mockNoteService.getNote).toHaveBeenCalled();
  });

  it('http post to root shoutd call createNote function from Notes Service', async () => {
    const dto = {
      note: 'me encanta trabajar con NestJs',
    };
    controller.createNote(dto);

    expect(mockNoteService.createNote).toHaveBeenCalled();
  });
});
