import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/adapters/logger/module'

@Module({
  imports: [LoggerModule],
  exports: [LoggerModule],
})
export class LoggerServiceModule {}
