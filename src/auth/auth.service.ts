import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { JwtService } from '@nestjs/jwt';
import * as RandomToken from '@sibevin/random-token';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/user-role/schemas/user-role.schema';
import { ResponseDto } from 'src/utils/response.dto';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshToken } from './schemas/refreshToken.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(UserRole.name)
    private userRoleModel: Model<UserRole>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto) {
    const { userName, email, password, userRole } = signUpDto;

    // Check if the user role exists
    const userRoleExists = await this.userRoleModel.findOne({
      name: userRole,
    });

    if (!userRoleExists) {
      throw new BadRequestException('User role does not exist');
    }

    // Check if the user already exists
    const userExists = await this.userModel.findOne({
      email,
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userModel.create({
        userName,
        email,
        password: hashedPassword,
        userRole: userRoleExists._id,
      });
      return new ResponseDto(user, 'User registered successfully');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).populate('userRole');

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { assessToken, refreshToken } = await this.generateUserToken(
      user._id,
    );

    return new ResponseDto(
      {
        assessToken,
        refreshToken,
      },
      'User registered successfully',
    );
  }

  async generateUserToken(userId) {
    const user = (await this.userModel
      .findById(userId)
      .populate('userRole')) as any;
    const { _id, userName, email, userRole } = user;
    const assessToken = this.jwtService.sign({
      _id,
      userName,
      email,
      role: userRole.name,
    });
    const refreshToken = RandomToken.gen({ length: 64 });

    await this.storeRefreshToken(_id, refreshToken);

    return {
      assessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(userId, refreshToken) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const expiryDate = new Date();
    expiryDate.setDate(
      expiryDate.getDate() + (parseInt(process.env.REFRESH_TOKEN_EXPIRY) || 5),
    );

    const userRefreshToken = await this.refreshTokenModel.findOne({
      user: user._id,
    });

    if (userRefreshToken) {
      userRefreshToken.token = refreshToken;
      userRefreshToken.expires = expiryDate;
      return await userRefreshToken.save();
    } else {
      return await this.refreshTokenModel.create({
        user: user,
        token: refreshToken,
        expires: expiryDate,
      });
    }
  }

  async refreshToken(refreshTokenDto: string) {
    const refreshToken = await this.refreshTokenModel.findOne({
      token: refreshTokenDto,
    });

    if (!refreshToken) {
      throw new BadRequestException('Invalid refresh token');
    }

    if (refreshToken.expires < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const tokenData = await this.generateUserToken(refreshToken.user._id);
    return new ResponseDto(tokenData, 'Token refreshed successfully');
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).populate('userRole');
    return new ResponseDto(user, 'Profile fetched successfully');
  }
}
