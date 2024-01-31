import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { ExpectedError, ExpectedErrorCode } from 'src/adapters/errors'
import { ILoggerService, IStorageService } from 'src/core/abstracts'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/core/entities'

@Injectable()
export class UserUseCases {
  constructor(
    private storage: IStorageService,
    private logger: ILoggerService,
    private jwt: JwtService
  ) {}

  async register(opt: UserRegisterOptions): Promise<UserRegisterResponse> {
    const logger = this.logger.named('UserRegisterUserCase')

    logger.log('options', opt)

    let user = await this.storage.users.get({ email: opt.email })

    if (user) {
      logger.log('User with this email is already exists')
      throw new ExpectedError('User with this email is already exists', ExpectedErrorCode.AlreadyExists)
    }

    user = await this.storage.users.get({ username: opt.username })

    if (user) {
      logger.log('User with this username is already exists')
      throw new ExpectedError('User with this username is already exists', ExpectedErrorCode.AlreadyExists)
    }

    const passwordHash = await bcrypt.hash(opt.password, 10)

    logger.debug('Password hash generated')

    const createdUser = await this.storage.users.create({
      email: opt.email,
      username: opt.username,
      passwordHash,
    })

    logger.debug('createdUser', createdUser)

    const payload = { userId: createdUser.id }
    const authToken = await this.jwt.signAsync(payload)

    return { user: createdUser, authToken }
  }

  async login(opt: UserLoginOptions): Promise<UserLoginResponse> {
    const logger = this.logger.named('UserLoginUserCase')

    logger.log('options', opt)

    let user = await this.storage.users.get({ email: opt.email })

    if (!user) {
      logger.log('User not exists')
      throw new ExpectedError('User not exists', ExpectedErrorCode.NotExists)
    }

    const passwordMatches = await bcrypt.compare(opt.password, user.passwordHash)

    if (!passwordMatches) {
      logger.log('Password not matches')
      throw new ExpectedError('Invalid password', ExpectedErrorCode.InvalidPassword)
    }

    const payload = { userId: user.id }
    const authToken = await this.jwt.signAsync(payload)

    return { user, authToken }
  }
}

interface UserRegisterOptions {
  email: string
  password: string
  username: string
}

interface UserRegisterResponse {
  user: User
  authToken: string
}

interface UserLoginOptions {
  email: string
  password: string
}

interface UserLoginResponse {
  user: User
  authToken: string
}
