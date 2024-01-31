import { Module } from '@nestjs/common'
import { PostController, UserController } from './controllers'
import { UserUseCasesModule } from './use-cases'
import { ConfigServiceModule, LoggerServiceModule, StorageServiceModule, TokenServiceModule } from './services'
import { PostUseCasesModule } from './use-cases/post'
import { FilerApiModule } from './api'

@Module({
  imports: [
    TokenServiceModule,
    ConfigServiceModule,
    LoggerServiceModule,
    StorageServiceModule,
    FilerApiModule,
    UserUseCasesModule,
    PostUseCasesModule,
  ],
  controllers: [UserController, PostController],
})
export class AppModule {}
