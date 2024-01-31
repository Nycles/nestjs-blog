import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Config } from 'config/config'
import { Request } from 'express'
import { ILoggerService } from 'src/core/abstracts'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private logger: ILoggerService,
    private config: ConfigService<Config>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const logger = this.logger.named('AuthGuard')

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      logger.log('Auth token is empty')
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('auth.tokenSecretKey', { infer: true }),
      })

      request['userId'] = payload.userId
    } catch (err) {
      logger.log('Invalid auth token', err)
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}

// Extend express Request interface by adding custom fields
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}
