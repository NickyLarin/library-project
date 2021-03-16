import { App } from '../types/app';
import * as winston from 'winston';
import { inject, injectable } from 'tsyringe';
import { Service } from '../enum/service';
import { LogLevel } from '../enum/log-level';

@injectable()
export class LoggerService implements App.Logger.Service {
  private logger: winston.Logger;

  constructor(@inject(Service.Config) private config: App.Config.Service) {
    this.logger = winston.createLogger({
      level: this.config.logLevel,
      transports: [new winston.transports.Console()],
    });
  }

  log(level: LogLevel, msg: string): void {
    this.logger.log(level, msg);
  }

  error(msg: string): void {
    this.log(LogLevel.Error, msg);
  }
  info(msg: string): void {
    this.log(LogLevel.Info, msg);
  }
  http(msg: string): void {
    this.log(LogLevel.Http, msg);
  }
  silly(msg: string): void {
    this.log(LogLevel.Silly, msg);
  }
  debug(msg: string): void {
    this.log(LogLevel.Debug, msg);
  }
  verbose(msg: string): void {
    this.log(LogLevel.Verbose, msg);
  }
  warn(msg: string): void {
    this.log(LogLevel.Warn, msg);
  }
}
