import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { FilerApi, ILoggerService, IStorageService } from 'src/core/abstracts'
import { Post } from 'src/core/entities'

@Injectable()
export class PostUseCases {
  constructor(
    private storage: IStorageService,
    private logger: ILoggerService,
    private file: FilerApi
  ) {}

  async create(opt: PostCreateOptions): Promise<Post> {
    const logger = this.logger.named('PostCreateUseCase')

    logger.log('options', { ...opt, imageBuffer: opt.imageBuffer?.length })

    let imageUrl: string

    if (opt.imageBuffer) {
      imageUrl = await this.file.uploadFile({ data: opt.imageBuffer, key: `posts-images/${randomUUID()}` })
    }

    const post = await this.storage.posts.create({
      title: opt.title,
      text: opt.text,
      authorId: opt.authorId,
      imageUrl,
    })

    return post
  }

  async list(opt: PostListOptions): Promise<Post[]> {
    const logger = this.logger.named('PostListUseCase')

    logger.log('options', opt)

    const posts = await this.storage.posts.list({})

    return posts
  }

  async get(id: string): Promise<Post> {
    const logger = this.logger.named('PostGetUseCase')

    logger.log('options', { id })

    const post = await this.storage.posts.get({ id })

    return post
  }
}

interface PostCreateOptions {
  imageBuffer?: Buffer
  title: string
  text: string
  authorId: string
}

interface PostListOptions {}
