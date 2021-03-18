import { App } from '../types/app'
import { container, injectable } from 'tsyringe'
import { Repository } from '../enum/repository'
import { Request, Response } from 'express'
import * as yup from 'yup'
import { schemaBookCreate } from '../schema/book'
import { NotFoundError } from '../error/NotFoundError'
import { BadRequestError } from '../error/BadRequestError'

@injectable()
export class BookController implements App.Controller.BookController {
  private bookRepository = container.resolve<App.Repository.BookRepository>(
    Repository.BookRepository,
  )

  all: App.Action = async (req: Request, res: Response) => {
    const books = await this.bookRepository.all()
    res.json(books)
  }

  one: App.Action = async (req: Request<{ id: string }>, res: Response) => {
    const bookID = await yup.number().positive().validate(req.params.id)
    try {
      const book = await this.bookRepository.one(bookID)
      res.json(book)
    } catch (err) {
      throw new NotFoundError([err.message])
    }
  }

  save: App.Action = async (req: Request, res: Response) => {
    const newBook = await schemaBookCreate.validate(req.body)
    try {
      const book = await this.bookRepository.save(newBook)
      res.json(book)
    } catch (err) {
      throw new BadRequestError([err.message])
    }
  }
}
