import { Post, User } from '../entities'

export abstract class IStorageService {
  abstract users: IUserRepository
  abstract posts: IPostRepository
}

export abstract class IUserRepository {
  get: (filter: UserGetFilter) => Promise<User>
  list: (filter: UserListFilter) => Promise<User[]>
  update: (id: string, user: Partial<User>) => Promise<User>
  create: (user: User) => Promise<User>
}

export abstract class IPostRepository {
  get: (filter: PostGetFilter) => Promise<Post>
  list: (filter: PostListFilter) => Promise<Post[]>
  update: (id: string, user: Partial<Post>) => Promise<Post>
  create: (post: Post) => Promise<Post>
}

export interface UserListFilter {}

export interface UserGetFilter {
  id?: string
  email?: string
  username?: string
}

export interface PostListFilter {}

export interface PostGetFilter {
  id?: string
}
