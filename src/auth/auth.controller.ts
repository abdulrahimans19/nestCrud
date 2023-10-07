import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() signupdto: SignUpDto) {
    return this.authService.signup(signupdto);
  }
  @Public()
  @Post('login')
  login(@Body() logindto: loginDto) {
    return this.authService.login(logindto);
  }
}
