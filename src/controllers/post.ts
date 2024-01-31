import {
  Controller,
  Post,
  Req,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UseGuards,
  Param,
  ParseFilePipe,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common'
import { Request } from 'express'
import { ILoggerService } from 'src/core/abstracts'
import { PostUseCases, PostCreateRequestDTO, PostGetRequestDTO } from 'src/use-cases'
import { AuthGuard } from './auth.guard'
import { Post as PostEntity } from 'src/core/entities'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('post')
export class PostController {
  constructor(
    private postUseCases: PostUseCases,
    private logger: ILoggerService
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  @Post('')
  async create(
    @Req() req: Request,
    @Body() body: PostCreateRequestDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2097152 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ): Promise<PostEntity> {
    const logger = this.logger.named('PostControllerCreate')

    logger.log('body', body)

    const post = await this.postUseCases.create({
      title: body.title,
      text: body.text,
      imageBuffer: file?.buffer,
      authorId: req.userId,
    })

    logger.log('post successfully created')

    return new PostEntity(post)
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async list(@Req() req: Request) {
    const logger = this.logger.named('PostControllerList')

    const posts = await this.postUseCases.list({})

    logger.log('posts successfully get')

    return posts.map((post) => new PostEntity(post))
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async get(@Req() req: Request, @Param() params: PostGetRequestDTO) {
    const logger = this.logger.named('PostControllerCreate')

    logger.log('params', params)

    const post = await this.postUseCases.get(params.id)

    logger.log('post successfully get')

    return new PostEntity(post)
  }
}

interface PostGetParams {}
