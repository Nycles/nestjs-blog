import { Controller, Post, Req, Body, Res, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { Request } from 'express'
import { ILoggerService } from 'src/core/abstracts'
import { User } from 'src/core/entities'
import { UserRegisterRequestDTO, UserLoginRequestDTO, UserUseCases } from 'src/use-cases'

@Controller('user')
export class UserController {
  constructor(
    private userUseCases: UserUseCases,
    private logger: ILoggerService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Req() req: Request, @Body() body: UserRegisterRequestDTO) {
    const logger = this.logger.named('UserControllerRegister')

    logger.log('body', body)

    const { user, authToken } = await this.userUseCases.register({
      email: body.email,
      password: body.password,
      username: body.username,
    })

    logger.log('user successfully registered')

    return { user: instanceToPlain(new User(user)), authToken }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Req() req: Request, @Body() body: UserLoginRequestDTO) {
    const logger = this.logger.named('UserControllerLogin')

    logger.log('body', body)

    const { user, authToken } = await this.userUseCases.login({
      email: body.email,
      password: body.password,
    })

    logger.log('user successfully login')

    return { user: instanceToPlain(new User(user)), authToken }
  }
}
