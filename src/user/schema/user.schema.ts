import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  roles: string;

  @Prop({ default: false })
  isBlocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export enum UserRoles {
  ADMIN = 'admin',
  VENDOR = 'vendor',
  USER = 'user',
}
