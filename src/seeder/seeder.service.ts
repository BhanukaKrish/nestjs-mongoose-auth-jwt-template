import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from '../user-role/schemas/user-role.schema';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(UserRole.name) private readonly userRoleModel: Model<UserRole>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seed() {
    await this.createUserRoles();
    await this.createUsers();
  }

  private async createUserRoles() {
    const userRoles = [
      {
        name: 'Super Admin',
        description: 'Super Admin role',
        status: 'active',
      },
      {
        name: 'Admin',
        description: 'Admin role',
        status: 'active',
      },
      {
        name: 'Member',
        description: 'Member role',
        status: 'active',
      },
    ];

    for (const userRole of userRoles) {
      const existingUserRole = await this.userRoleModel.findOne({
        name: userRole.name,
      });
      if (!existingUserRole) {
        await this.userRoleModel.create(userRole);
        this.logger.log(`Created user role: ${userRole.name}`);
      } else {
        this.logger.log(`User role already exists: ${userRole.name}`);
      }
    }
  }

  private async createUsers() {
    const superAdminRole = await this.userRoleModel.findOne({
      name: 'Super Admin',
    });
    if (!superAdminRole) {
      this.logger.error(
        'Super Admin role not found, cannot create Super Admin user',
      );
      return;
    }

    const users = [
      {
        userName: 'Super Admin',
        email: 'superadmin@gamil.com',
        password: await bcrypt.hash('Admin@123', 10),
        userRole: superAdminRole._id,
      },
    ];

    for (const user of users) {
      const existingUser = await this.userModel.findOne({
        email: user.email,
      });
      if (!existingUser) {
        await this.userModel.create(user);
        this.logger.log(`Created user: ${user.email}`);
      } else {
        this.logger.log(`User already exists: ${user.email}`);
      }
    }
  }
}
