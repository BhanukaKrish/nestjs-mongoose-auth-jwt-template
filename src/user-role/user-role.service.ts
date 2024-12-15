import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './schemas/user-role.schema';
import { ResponseDto } from 'src/utils/response.dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRole.name) private userRoleModel: Model<UserRole>,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const userRole = new this.userRoleModel(createUserRoleDto);
    try {
      const savedUserRole = await userRole.save();
      return new ResponseDto(savedUserRole, 'User role created successfully');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const userRoles = await this.userRoleModel.find();
    return new ResponseDto(userRoles, 'User roles retrieved successfully');
  }

  async findOne(id: string) {
    const userRole = await this.userRoleModel.findById(id);
    if (!userRole) {
      throw new BadRequestException('User role not found');
    }
    return new ResponseDto(userRole, 'User role retrieved successfully');
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const updatedUserRole = await this.userRoleModel.findByIdAndUpdate(
      id,
      updateUserRoleDto,
      { new: true },
    );
    if (!updatedUserRole) {
      throw new BadRequestException('User role not found');
    }
    return new ResponseDto(updatedUserRole, 'User role updated successfully');
  }

  async remove(id: string) {
    const deletedUserRole = await this.userRoleModel.findByIdAndDelete(id);
    if (!deletedUserRole) {
      throw new BadRequestException('User role not found');
    }
    return new ResponseDto(deletedUserRole, 'User role deleted successfully');
  }
}
