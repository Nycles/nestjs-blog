import { Module } from '@nestjs/common'
import { FilerApi } from 'src/core/abstracts'
import { AwsS3Api } from './service'
import { LoggerServiceModule } from 'src/services'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [LoggerServiceModule, ConfigModule],
  providers: [
    {
      provide: FilerApi,
      useClass: AwsS3Api,
    },
  ],
  exports: [FilerApi],
})
export class FilerApiModule {}
