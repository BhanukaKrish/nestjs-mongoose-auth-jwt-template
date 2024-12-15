import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserRoleModule } from './../user-role/user-role.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [UserRoleModule, AuthModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
