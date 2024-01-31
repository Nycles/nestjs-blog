import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { IUserRepository, UserGetFilter, UserListFilter } from 'src/core/abstracts'
import { User } from 'src/core/entities'
import { DefaultArgs } from '@prisma/client/runtime/library'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private model: Prisma.UserDelegate<DefaultArgs>) {}

  async get(filter: UserGetFilter): Promise<User> {
    const { id, username, email } = filter

    return this.model.findUnique({ where: { id, username, email } })
  }

  async list(filter: UserListFilter): Promise<User[]> {
    return this.model.findMany(filter)
  }

  async update(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return this.model.update({ data: user, where: { id } })
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.model.create({ data: user })
  }
}
