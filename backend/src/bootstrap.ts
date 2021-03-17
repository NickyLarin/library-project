import { container, Lifecycle } from 'tsyringe'
import { ConfigServiceJson } from './service/ConfigServiceJson'
import { App } from './types/app'
import { Service } from './enum/service'
import { LoggerService } from './service/LoggerService'
import { Controller } from './enum/controller'
import { BookController } from './controller/BookController'

container.register<App.Config.Service>(
  Service.Config,
  {
    useClass: ConfigServiceJson,
  },
  { lifecycle: Lifecycle.Singleton },
)

container.register<App.Logger.Service>(
  Service.Logger,
  {
    useClass: LoggerService,
  },
  { lifecycle: Lifecycle.Singleton },
)

container.register<App.Controller.BookController>(
  Controller.BookController,
  {
    useClass: BookController,
  },
  { lifecycle: Lifecycle.Singleton },
)
