import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { LikeNoteDto } from '../dto/like-note.dto';
import { MongoDbObjectIdPipe } from '../../pipes/mongodb-object-id.pipe';
import { NotesService } from '../service/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  async getNotes() {
    try {
      const response = await this.notesService.getNotes();
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:noteId')
  async getNote(@Param('noteId', MongoDbObjectIdPipe) noteId: string) {
    try {
      const response = await this.notesService.getNote(noteId);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('liked/:userId')
  async getLikedNotes(@Param('userId', MongoDbObjectIdPipe) userId: string) {
    try {
      const response = await this.notesService.getLikedNotes(userId);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    try {
      return this.notesService.createNote(createNoteDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('/like')
  async likeNote(@Body() likeNoteDto: LikeNoteDto) {
    try {
      const response = await this.notesService.likeNote(likeNoteDto);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
