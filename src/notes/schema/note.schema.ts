import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class NoteDocument extends Document {
  @Prop({ trim: true, required: [true, 'The note is required'] })
  note: string;

  @Prop({ trim: true, default: [] })
  likedBy: string[];
}

export const NoteSchema = SchemaFactory.createForClass(NoteDocument);
