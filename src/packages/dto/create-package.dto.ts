import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  duration: number;
}
