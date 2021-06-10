import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesService } from '../service/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Get()
  async getNotes() {
    try {
      const response = await this.noteService.getNotes();
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    try {
      const response = await this.noteService.createNote(createNoteDto);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
