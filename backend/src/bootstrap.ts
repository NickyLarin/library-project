import { container } from 'tsyringe';
import { ConfigServiceJson } from './service/ConfigServiceJson';
import { App } from './types/app';
import { Service } from './enum/service';
import { ConfigServiceCustom } from './service/ConfigServiceCustom';

container.register<App.Config.Service>(Service.Config, {
  useClass: ConfigServiceJson,
});
