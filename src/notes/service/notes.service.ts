import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NoteDocument } from '../schema/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('note') private readonly noteModel: Model<NoteDocument>,
  ) {}

  async getNotes() {
    try {
      return this.noteModel.find();
    } catch (error) {
      return error;
    }
  }

  async createNote(dto: CreateNoteDto) {
    try {
      return this.noteModel.create(dto);
    } catch (error) {
      return error;
    }
  }
}
