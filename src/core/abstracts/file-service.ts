export interface Apis {
  file: FilerApi
}

export interface UploadFileOptions {
  data: Buffer
  key: string
}

export interface GetFileLinkOptions {
  bucket: string
  key: string
}

export abstract class FilerApi {
  uploadFile: (opt: UploadFileOptions) => Promise<FileURL>
}

type FileURL = string
