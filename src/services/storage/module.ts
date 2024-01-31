import { Module } from '@nestjs/common'
import { PrismaStorageModel } from 'src/adapters/frameworks/storage-services'

@Module({
  imports: [PrismaStorageModel],
  exports: [PrismaStorageModel],
})
export class StorageServiceModule {}
