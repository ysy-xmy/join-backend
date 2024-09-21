import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  
  @IsNotEmpty()
  schoolId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
