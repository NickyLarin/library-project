import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Book } from '../entity/Book';
import { App } from '../types/app';
import { singleton } from 'tsyringe';

@singleton()
export class BookController implements App.Controller.BookController {
  private bookRepository = getRepository(Book);

  all: App.Action = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    return this.bookRepository.find({ relations: ['authors'] });
  };

  //   async one(request: Request, response: Response, next: NextFunction) {
  //     return this.userRepository.findOne(request.params.id);
  //   }

  //   async save(request: Request, response: Response, next: NextFunction) {
  //     return this.userRepository.save(request.body);
  //   }

  //   async remove(request: Request, response: Response, next: NextFunction) {
  //     let userToRemove = await this.userRepository.findOne(request.params.id);
  //     return await this.userRepository.remove(userToRemove);
  //   }
}
