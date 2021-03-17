import { container, Lifecycle } from 'tsyringe'
import { ConfigServiceJson } from './service/ConfigServiceJson'
import { App } from './types/app'
import { Service } from './enum/service'
import { LoggerService } from './service/LoggerService'
import { Controller } from './enum/controller'
import { BookController } from './controller/BookController'

const SingletonContainerOpt = { lifecycle: Lifecycle.Singleton }

container.register<App.Config.Service>(
  Service.Config,
  {
    useClass: ConfigServiceJson,
  },
  SingletonContainerOpt,
)

container.register<App.Logger.Service>(
  Service.Logger,
  {
    useClass: LoggerService,
  },
  SingletonContainerOpt,
)

container.register<App.Controller.BookController>(
  Controller.BookController,
  {
    useClass: BookController,
  },
  SingletonContainerOpt,
)
