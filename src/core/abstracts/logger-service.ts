export abstract class ILoggerService {
  abstract log(message: string, ...deps: any)
  abstract debug(message: string, ...deps: any)
  abstract warn(message: string, ...deps: any)
  abstract error(message: string, ...deps: any)
  abstract named(name: string): ILoggerService
}
