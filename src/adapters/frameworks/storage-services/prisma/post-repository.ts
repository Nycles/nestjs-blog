import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { IPostRepository, PostGetFilter, PostListFilter } from 'src/core/abstracts'
import { Post, User } from 'src/core/entities'
import { DefaultArgs } from '@prisma/client/runtime/library'

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(private model: Prisma.PostDelegate<DefaultArgs>) {}

  async get(filter: PostGetFilter): Promise<Post> {
    const { id } = filter

    return this.model.findUnique({ where: { id }, include: { author: true } })
  }

  async list(filter: PostListFilter): Promise<Post[]> {
    return this.model.findMany({ include: { author: true } })
  }

  async update(id: string, user: User): Promise<Post> {
    return this.model.update({ data: user, where: { id } })
  }

  async create(post: Post): Promise<Post> {
    const { title, text, authorId, imageUrl } = post

    return this.model.create({
      data: { title, text, imageUrl, author: { connect: { id: authorId } } },
      include: { author: true },
    })
  }
}
