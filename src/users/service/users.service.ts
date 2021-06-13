import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dtp';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers() {
    try {
      return this.userModel.find({}, 'email');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUser(userId: string) {
    try {
      return this.userModel.findById(userId, 'email');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser(dto: CreateUserDto) {
    try {
      const { _id, email } = await this.userModel.create(dto);
      return { _id, email };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserByEmail(userEmail: string) {
    try {
      return this.userModel.findOne({ email: userEmail });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
