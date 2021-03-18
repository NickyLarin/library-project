import { injectable } from 'tsyringe'
import { getRepository, In } from 'typeorm'
import { Author } from '../entity/Author'
import { Book } from '../entity/Book'
import { App } from '../types/app'
import { NotFoundError } from './error/NotFoundError'

@injectable()
export class BookRepository implements App.Repository.BookRepository {
  private bookRepository = getRepository(Book)
  private authorRepository = getRepository(Author)
  all = async () => {
    return await this.bookRepository.find({ relations: ['authors'] })
  }
  one = async (id: number) => {
    const book = await this.bookRepository.findOne(id, {
      relations: ['authors'],
    })

    if (!book) {
      throw new NotFoundError(
        `${BookRepository.name}: book id '${id}' not found`,
      )
    }
    return book
  }

  private getAuthorByIDs = async (authorsIDs) => {
    const authors = await this.authorRepository.find({
      id: In([...authorsIDs]),
    })
    if (authors.length !== authorsIDs.length) {
      //   throw new BadRequestError(['not all authors id were found'])
      throw new NotFoundError(
        `${BookRepository.name}: not all author ids were found`,
      )
    }
    return authors
  }

  private saveNewAuthors = async (newAuthors) => {
    const authors = []
    for (let author of newAuthors) {
      authors.push(await this.authorRepository.save(author))
    }
    return authors
  }

  private preprocessAuthors = async (bookObj: any) => {
    if (!Array.isArray(bookObj.authors)) {
      return []
    }

    const authorsIDs = []
    const newAuthors = []
    for (const author of bookObj.authors) {
      if (typeof author === 'number') {
        authorsIDs.push(author)
      } else {
        newAuthors.push(author)
      }
    }

    const existingAuthors = await this.getAuthorByIDs(authorsIDs)
    const savedAuthors = await this.saveNewAuthors(newAuthors)

    return [...existingAuthors, ...savedAuthors]
  }

  save = async (newBook: App.Book.Create.Body) => {
    const book = await this.bookRepository.save({
      ...newBook,
      authors: await this.preprocessAuthors(newBook),
    })
    return book
  }
}
