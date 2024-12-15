import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoleDto } from './create-user-role.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserRoleStatus } from 'src/constance/status.constance';

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {
  @IsNotEmpty()
  @IsString()
  status: UserRoleStatus;
}
