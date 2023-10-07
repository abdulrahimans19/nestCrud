import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async blockUser(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isBlocked = true;
    await user.save();
    return 'User blocked successfully';
  }

  async unblockUser(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isBlocked = false;
    await user.save();
    return 'User unblocked successfully';
  }

  async deleteUser(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.deleteOne();
    return 'User deleted successfully';
  }

  async getUserDetails(
    userId: string,
  ): Promise<{ message: string; user?: User }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User details retrieved successfully', user };
  }
}
