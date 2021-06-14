import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { MongoDbObjectIdPipe } from '../../pipes/mongodb-object-id.pipe';
import { NotesService } from '../service/notes.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('/liked')
  async getLikedNotes(@Request() req: any) {
    try {
      const response = await this.notesService.getLikedNotes(req.user._id);
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

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    try {
      return this.notesService.createNote(createNoteDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/like/:noteId')
  async likeNote(
    @Param('noteId', MongoDbObjectIdPipe) noteId: string,
    @Request() req: any,
  ) {
    try {
      const response = await this.notesService.likeNote({
        userId: req.user._id,
        noteId: noteId,
      });
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
