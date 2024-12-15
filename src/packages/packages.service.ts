import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from './schemas/package.schema';
import { Model } from 'mongoose';
import { ResponseDto } from 'src/utils/response.dto';
import { mongoDbIdValidation } from 'src/utils/validation-checker';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<Package>,
  ) {}

  private async checkIfRecordExists(id: string) {
    const record = await this.packageModel.findById(id);
    if (!record) {
      throw new BadRequestException('Package not found');
    }
    return record;
  }

  async create(createPackageDto: CreatePackageDto) {
    // check name is exist
    const isExist = await this.packageModel.findOne({
      name: createPackageDto.name,
    });
    if (isExist) {
      throw new BadRequestException('Package name is exist');
    }
    const packageModel = new this.packageModel(createPackageDto);
    try {
      const packageData = await packageModel.save();
      return new ResponseDto(packageData, 'Create package success');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const packageData = await this.packageModel.find();
    return new ResponseDto(packageData, 'Get all package success');
  }

  async findOne(id: string) {
    await mongoDbIdValidation(id);
    const packageData = await this.checkIfRecordExists(id);
    return new ResponseDto(packageData, 'Get package success');
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    await mongoDbIdValidation(id);
    await this.checkIfRecordExists(id);
    try {
      await this.packageModel.updateOne({ _id: id }, updatePackageDto);
      return new ResponseDto('', 'Update package success');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    await mongoDbIdValidation(id);
    await this.checkIfRecordExists(id);
    try {
      await this.packageModel.deleteOne({ _id: id });
      return new ResponseDto('', 'Delete package success');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
