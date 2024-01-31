export class ExpectedError extends Error {
  code: string

  constructor(message, code) {
    super(message)
    this.code = code
    this.name = 'ExpectedError'
  }
}

export enum ExpectedErrorCode {
  FileIsTooLarge = 'file_is_too_large',
  NoFileUploaded = 'no_file_uploaded',
  InvalidMimeType = 'invalid_mime_type',
  AlreadyExists = 'already_exists',
  NotExists = 'not_exists',
  InvalidPassword = 'invalid_password',
}

export const expectedErrors = {
  uploadFile: {
    FileIsTooLarge: new ExpectedError('File is too large', ExpectedErrorCode.FileIsTooLarge),
    NoFileUploaded: new ExpectedError('No file uploaded', ExpectedErrorCode.NoFileUploaded),
    InvalidMimeType: new ExpectedError('Mime type is not allowed', ExpectedErrorCode.InvalidMimeType),
  },
}
