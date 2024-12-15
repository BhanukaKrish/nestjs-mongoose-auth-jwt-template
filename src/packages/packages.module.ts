import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageSchema } from './schemas/package.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Package', schema: PackageSchema }]),
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
