import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleSchema } from './schemas/user-role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserRole', schema: UserRoleSchema }]),
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [MongooseModule],
})
export class UserRoleModule {}
