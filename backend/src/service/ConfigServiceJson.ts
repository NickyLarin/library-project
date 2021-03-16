import { App } from '../types/app';
import { injectable, Lifecycle, scoped, singleton } from 'tsyringe';
import { Service } from '../enum/service';
import { LogLevel } from '../enum/log-level';

@injectable()
export class ConfigServiceJson implements App.Config.Service {
  readonly port: number;
  readonly logLevel: LogLevel;

  constructor() {
    const data = require('../../config/config.json');
    this.port = data.port;
    this.logLevel = data.logLevel;
  }
}
