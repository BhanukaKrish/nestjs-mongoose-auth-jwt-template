import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleStatus } from 'src/constance/status.constance';

@Schema({ timestamps: true })
export class UserRole extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 'active' })
  status: UserRoleStatus;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
