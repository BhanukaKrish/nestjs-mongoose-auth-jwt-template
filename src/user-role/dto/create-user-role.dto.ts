import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
