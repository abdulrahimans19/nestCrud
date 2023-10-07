import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { loginDto } from 'src/auth/dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signup(user: SignUpDto): Promise<{ message: string }> {
    const userExists = await this.userModel.findOne({ email: user.email });
    if (userExists) {
      throw new HttpException(
        'Email already exists. Please log in to your account.',
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      email: user.email,
      password: hashedPassword,
    });
    await newUser.save();
    return {
      message: 'Registerd Succesfully',
    };
  }

  async login(user: loginDto): Promise<{ message: string; token: string }> {
    const isUser = await this.userModel.findOne({ email: user.email });
    if (!isUser) {
      throw new HttpException(
        'User Not Found. Please Check Your Credentials or Create an Account',
        HttpStatus.NOT_FOUND,
      );
    }

    if (isUser.isBlocked) {
      throw new HttpException(
        'you are denied to use this access',
        HttpStatus.FORBIDDEN,
      );
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      isUser.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Password is wrong', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      sub: isUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return {
      message: 'Login Successful',
      token: token,
    };
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }
}
