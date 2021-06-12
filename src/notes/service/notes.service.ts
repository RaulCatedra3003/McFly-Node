import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from '../dto/create-note.dto';
import { LikeNoteDto } from '../dto/like-note.dto';
import { NoteDocument } from '../schema/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('note') private readonly noteModel: Model<NoteDocument>,
  ) {}

  async getNotes() {
    try {
      return this.noteModel.find();
      //.select({ __v: 0, createdAt: 0, updatedAt: 0 });
    } catch (error) {
      return error;
    }
  }

  async getNote(noteId: string) {
    try {
      return this.noteModel.findOne({ _id: noteId });
      //.select({ __v: 0, createdAt: 0, updatedAt: 0 });
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

  async likeNote(dto: LikeNoteDto) {
    try {
      return this.noteModel.findOneAndUpdate(
        { _id: dto.noteId },
        { $push: { likedBy: dto.userId } },
        { new: true },
      );
      //.select({ __v: 0, createdAt: 0, updatedAt: 0 });
    } catch (error) {
      return error;
    }
  }

  async getLikedNotes(userId: string) {
    try {
      return this.noteModel.find({ likedBy: userId });
      //.select({ __v: 0, createdAt: 0, updatedAt: 0 });
    } catch (error) {
      return error;
    }
  }
}
