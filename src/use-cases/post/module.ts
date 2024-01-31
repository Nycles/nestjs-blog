import { Module } from '@nestjs/common'
import { PostUseCases } from './use-cases'
import { LoggerServiceModule, StorageServiceModule } from 'src/services'
import { FilerApiModule } from 'src/api'

@Module({
  imports: [StorageServiceModule, LoggerServiceModule, FilerApiModule],
  providers: [PostUseCases],
  exports: [PostUseCases],
})
export class PostUseCasesModule {}
