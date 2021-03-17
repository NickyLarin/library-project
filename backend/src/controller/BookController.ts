import { getRepository, In } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Book } from '../entity/Book'
import { App } from '../types/app'
import { injectable } from 'tsyringe'
import { NotFoundError } from '../error/NotFoundError'
import { schemaBookCreate } from '../schema/book'
import { Author } from '../entity/Author'
import { schemaAuthorCreate } from '../schema/author'
import { BadRequestError } from '../error/BadRequestError'
import { ValidationError } from 'yup'

@injectable()
export class BookController implements App.Controller.BookController {
  private bookRepository = getRepository(Book)
  private authorRepository = getRepository(Author)

  all: App.Action = async (req: Request, res: Response) => {
    const books = await this.bookRepository.find({ relations: ['authors'] })
    res.json(books)
  }

  one: App.Action = async (req: Request<{ id: string }>, res: Response) => {
    const book = await this.bookRepository.findOne(req.params.id, {
      relations: ['authors'],
    })

    if (!book) {
      throw new NotFoundError()
    }
    res.json(book)
  }

  save: App.Action = async (req: Request, res: Response) => {
    // Validating and saving book authors
    if (Array.isArray(req.body.authors)) {
      // If `authors` is array of IDs
      if (req.body.authors.every((author) => typeof author === 'number')) {
        req.body.authors = await this.getAuthorsById(req.body)
      }
      // If `authors` is array of objects
      else {
        req.body.authors = await this.saveNewAuthors(req.body)
      }
    }
    await schemaBookCreate.validate(req.body, { abortEarly: false })
    const book = await this.bookRepository.save(req.body)
    res.status(201).json(book)
  }

  private getAuthorsById = async (reqBody) => {
    const authors = await this.authorRepository.find({
      id: In([...reqBody.authors]),
    })
    if (authors.length !== reqBody.authors.length) {
      throw new BadRequestError(['not all authors id were found'])
    }
    return authors
  }

  private saveNewAuthors = async (reqBody) => {
    const authors = []
    for (let author of reqBody.authors) {
      try {
        await schemaAuthorCreate.validate(author)
      } catch (err) {
        throw new ValidationError([
          new ValidationError('author validation error'),
          err,
        ])
      }
      authors.push(await this.authorRepository.save(author))
    }
    return authors
  }
}
