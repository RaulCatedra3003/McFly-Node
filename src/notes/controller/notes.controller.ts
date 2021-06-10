import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { MongoDbObjectIdPipe } from '../pipes/mongodb-object-id.pipe';
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

  @Get('/:noteId')
  async getNote(@Param('noteId', MongoDbObjectIdPipe) noteId: string) {
    try {
      const response = await this.noteService.getNote(noteId);
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
