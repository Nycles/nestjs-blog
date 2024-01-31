import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from 'config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigServiceModule {}
