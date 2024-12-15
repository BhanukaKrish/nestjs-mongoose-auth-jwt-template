import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserStatus } from 'src/constance/status.constance';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  userName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ type: Types.ObjectId, ref: 'UserRole', required: true })
  userRole: Types.ObjectId;

  @Prop({ default: null })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
