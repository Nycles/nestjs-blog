import { Module } from '@nestjs/common'
import { ILoggerService } from 'src/core/abstracts'
import { LoggerService } from './service'

@Module({
  providers: [
    {
      provide: ILoggerService,
      useClass: LoggerService,
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
