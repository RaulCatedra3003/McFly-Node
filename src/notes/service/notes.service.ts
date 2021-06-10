import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteDocument } from '../schema/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('note') private readonly noteModel: Model<NoteDocument>,
  ) {}
}
