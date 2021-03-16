import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Book } from '../entity/Book';
import { App } from '../types/app';
import { injectable, singleton } from 'tsyringe';

@injectable()
export class BookController implements App.Controller.BookController {
  private bookRepository = getRepository(Book);

  all: App.Action<Book> = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Book[]> => {
    return this.bookRepository.find({ relations: ['authors'] });
  };
}
