import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'config/config'
import { FilerApi, ILoggerService, UploadFileOptions } from 'src/core/abstracts'

@Injectable()
export class AwsS3Api implements FilerApi {
  private s3: S3Client

  constructor(
    private logger: ILoggerService,
    private cfg: ConfigService<Config>
  ) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: cfg.get('awsS3.accessKeyId', { infer: true }),
        secretAccessKey: cfg.get('awsS3.secretAccessKey', { infer: true }),
      },
      region: cfg.get('awsS3.region', { infer: true }),
    })
  }

  uploadFile = async (opt: UploadFileOptions) => {
    const logger = this.logger.named('AwsS3ApiUploadFile')

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.cfg.get('awsS3.bucketName', { infer: true }),
          Key: opt.key,
          Body: opt.data,
        })
      )

      const fileUrl = getFileUrl(
        this.cfg.get('awsS3.bucketName', { infer: true }),
        this.cfg.get('awsS3.region', { infer: true }),
        opt.key
      )

      return fileUrl
    } catch (err) {
      logger.error('Failed to upload file through API', err)
      throw Error('Failed to upload file through API')
    }
  }
}

const getFileUrl = (bucket: string, region: string, key: string) => {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}
