// import {UserController} from "./controller/UserController";
import { container } from 'tsyringe'
import { BookController } from './controller/BookController'
import { Controller } from './enum/controller'
import { App } from './types/app'

const bookController = container.resolve<App.Controller.BookController>(
  Controller.BookController,
)

export const Routes: App.Route[] = [
  {
    method: 'get',
    route: '/books',
    controller: bookController,
    action: bookController.all,
  },
  {
    method: 'get',
    route: '/books/:id',
    controller: bookController,
    action: bookController.one,
  },
  {
    method: 'post',
    route: '/books',
    controller: bookController,
    action: bookController.save,
  },
]
