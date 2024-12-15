import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDto } from './create-package.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { PackageStatus } from 'src/constance/status.constance';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
  @IsNotEmpty()
  @IsString()
  status: PackageStatus;
}
