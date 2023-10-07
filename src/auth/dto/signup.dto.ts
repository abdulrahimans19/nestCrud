import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter email with valid format' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}
