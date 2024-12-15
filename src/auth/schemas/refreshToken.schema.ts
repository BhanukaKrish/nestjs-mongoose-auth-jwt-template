import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop()
  token: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  expires: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
