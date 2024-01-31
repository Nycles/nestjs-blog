import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter } from '@nestjs/common'
import { ExpectedError } from './expected-errors'
import { Response } from 'express'

@Catch(HttpException, ExpectedError)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof HttpException) {
      const status = exception.getStatus()

      return response.status(status).json({
        statusCode: status,
        message: exception.message,
      })
    }

    if (exception instanceof ExpectedError) {
      const status = HttpStatus.UNPROCESSABLE_ENTITY

      return response.status(status).json({
        statusCode: exception.code,
        message: exception.message,
      })
    }
  }
}
