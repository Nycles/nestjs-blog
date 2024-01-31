import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { User } from 'src/core/entities'

export class UserRegisterRequestDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string

  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  username: string
}

export class UserLoginRequestDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
