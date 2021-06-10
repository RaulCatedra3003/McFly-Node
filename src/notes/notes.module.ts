import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './controller/notes.controller';
import { NoteSchema } from './schema/note.schema';
import { NotesService } from './service/notes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'note', schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
