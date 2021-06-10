import { BadRequestException, Controller, Get } from '@nestjs/common';
import { NotesService } from '../service/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Get()
  async getNotes() {
    try {
      return this.noteService.getNotes();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
