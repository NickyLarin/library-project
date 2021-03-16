// import {UserController} from "./controller/UserController";
import { container } from 'tsyringe';
import { BookController } from './controller/BookController';
import { App } from './types/app';

const bookController = container.resolve(BookController);

export const Routes: App.Route[] = [
  {
    method: 'get',
    route: '/books',
    controller: bookController,
    action: bookController.all,
  },
];
