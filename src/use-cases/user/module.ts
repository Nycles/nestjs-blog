import { Module } from '@nestjs/common'
import { UserUseCases } from './use-cases'
import { ConfigServiceModule, LoggerServiceModule, StorageServiceModule, TokenServiceModule } from 'src/services'

@Module({
  imports: [ConfigServiceModule, TokenServiceModule, StorageServiceModule, LoggerServiceModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
