import { Injectable, Logger } from '@nestjs/common'
import { ILoggerService } from 'src/core/abstracts'

@Injectable()
export class LoggerService extends Logger {
  constructor() {
    super()
  }

  named(name: string) {
    return new Logger(name)
  }
}
