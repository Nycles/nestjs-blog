import { IsEmail, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class PostCreateRequestDTO {
  image?: File

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title: string

  @MaxLength(10000)
  @MinLength(30)
  @IsString()
  @IsNotEmpty()
  text: string
}

export class PostGetRequestDTO {
  @IsString()
  @IsNotEmpty()
  id: string
}
