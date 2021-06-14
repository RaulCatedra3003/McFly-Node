import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserDocument extends Document {
  @Prop({ trim: true, required: [true, 'The email is required'], unique: true })
  email: string;

  @Prop({ trim: true, required: [true, 'The password is required'] })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
