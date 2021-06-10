import { Controller } from '@nestjs/common';
import { NotesService } from '../service/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}
}
