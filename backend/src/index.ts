import 'reflect-metadata';
import './bootstrap';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Routes } from './routes';
// import { User } from './entity/User';
import { ConfigServiceJson } from './service/ConfigServiceJson';
import { container } from 'tsyringe';
import { App } from './types/app';
import { Service } from './enum/service';

const config = container.resolve<App.Config.Service>(Service.Config);

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(config.port);

    // insert new users for test
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: 'Timber',
    //     lastName: 'Saw',
    //     age: 27,
    //   })
    // );
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: 'Phantom',
    //     lastName: 'Assassin',
    //     age: 24,
    //   })
    // );

    console.log(
      `Express server has started on port ${config.port}. Open http://localhost:${config.port}/users to see results`
    );
  })
  .catch((error) => console.log(error));
