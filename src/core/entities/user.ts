import { Exclude, instanceToPlain } from 'class-transformer'

export class User {
  id?: string
  email: string
  username: string

  @Exclude()
  passwordHash: string

  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}

export class Post {
  id?: string
  imageUrl?: string
  title: string
  text: string
  authorId: string
  author?: User

  constructor(partial: Partial<Post>) {
    const { author } = partial

    Object.assign(this, { ...partial, author: author ? instanceToPlain(new User(author)) : undefined })
  }
}
