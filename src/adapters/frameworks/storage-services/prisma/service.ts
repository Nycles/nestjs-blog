import { Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { UserRepository } from './user-repository'
import { PostRepository } from './post-repository'

@Injectable()
export class PrismaStorageService extends PrismaClient implements OnModuleInit {
  users: UserRepository
  posts: PostRepository

  async onModuleInit() {
    await this.$connect()

    this.users = new UserRepository(this.user)
    this.posts = new PostRepository(this.post)
  }
}
