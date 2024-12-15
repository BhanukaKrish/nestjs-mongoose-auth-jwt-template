import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PackageStatus } from 'src/constance/status.constance';

@Schema({ timestamps: true })
export class Package {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, default: PackageStatus.ACTIVE })
  status: PackageStatus;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
