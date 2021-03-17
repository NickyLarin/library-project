import 'reflect-metadata'
import './bootstrap'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { App } from './types/app'
import { Service } from './enum/service'
import { Book } from './entity/Book'
import { Author } from './entity/Author'
import { error } from './utils'
import { NotFoundError } from './error/NotFoundError'
import { BadRequestError } from './error/BadRequestError'
// import {Routes} from './routes';

const config = container.resolve<App.Config.Service>(Service.Config)
const logger = container.resolve<App.Logger.Service>(Service.Logger)

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express()
    app.use(bodyParser.json())

    const { Routes } = require('./routes')
    // register express routes from defined application routes
    Routes.forEach((route) => {
      ;(app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: express.NextFunction) => {
          try {
            await route.action(req, res, next)
          } catch (err) {
            if (err?.name === 'ValidationError') {
              error(new BadRequestError(err?.errors ?? []), req, res)
            } else {
              error(err, req, res)
            }
          }
        },
      )
    })

    app.all('*', (req: Request, res: Response) => {
      error(new NotFoundError(), req, res)
    })

    // setup express app here
    // ...

    // start express server
    app.listen(config.port)

    // insert test data
    const author1 = connection.manager.create(Author, {
      name: 'Test Author 1',
    })
    const author2 = connection.manager.create(Author, {
      name: 'Test Author 2',
    })
    await connection.manager.save([author1, author2])
    const book = connection.manager.create(Book, {
      title: 'Test book',
      year: 2021,
      authors: [author1, author2],
    })
    await connection.manager.save(book)

    logger.debug(
      `Express server has started on port ${config.port}. Open http://localhost:${config.port}/users to see results`,
    )
  })
  .catch((error) => console.log(error))
