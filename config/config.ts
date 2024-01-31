interface AuthConfig {
  tokenSecretKey: string
  tokenLifeTime: string
}

interface AwsS3 {
  region: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
}

interface FileUploading {
  maxSize: number
}

export interface Config {
  port: number
  auth: AuthConfig
  awsS3: AwsS3
  fileUploading: FileUploading
}

export default (): Config => ({
  port: parseInt(process.env.PORT || '8000', 10),

  auth: {
    tokenSecretKey: process.env.JWT_SECRET || 'OgnqUpNa8R',
    tokenLifeTime: '7d',
  },

  awsS3: {
    region: process.env.AWSS3_REGION || '',
    bucketName: process.env.AWSS3_BUCKET_NAME || '',
    accessKeyId: process.env.AWSS3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWSS3_SECRET_ACCESS_KEY || '',
  },

  fileUploading: {
    maxSize: 2097152,
  },
})
