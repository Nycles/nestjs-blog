import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigServiceModule } from '../config/module'
import { ConfigService } from '@nestjs/config'
import { Config } from 'config/config'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigServiceModule],
      useFactory: async (configService: ConfigService<Config>) => ({
        secret: configService.get('auth.tokenSecretKey', { infer: true }),
        signOptions: {
          expiresIn: configService.get('auth.tokenLifeTime', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class TokenServiceModule {}
