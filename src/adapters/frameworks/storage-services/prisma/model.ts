import { Module } from '@nestjs/common'
import { IStorageService } from 'src/core/abstracts'
import { PrismaStorageService } from './service'

@Module({
  providers: [
    {
      provide: IStorageService,
      useClass: PrismaStorageService,
    },
  ],
  exports: [IStorageService],
})
export class PrismaStorageModel {}
