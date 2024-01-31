import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './adapters/errors'
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'config/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const firstValidationErrorMessage = validationErrors.map((error) => Object.values(error.constraints)[0])[0]
        return new BadRequestException(firstValidationErrorMessage)
      },
    })
  )

  const configService = app.get(ConfigService<Config>)
  const port = configService.get('port')

  await app.listen(port)
}
bootstrap()
