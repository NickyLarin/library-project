import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Book } from '../entity/Book';
import { LogLevel } from '../enum/log-level';

export declare namespace App {
  namespace Config {
    interface Service {
      readonly port: number;
      readonly logLevel: LogLevel;
    }
  }

  type Action<T> = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<T[]>;

  namespace Logger {
    interface Service {
      log(level: LogLevel, msg: string): void;
      error(msg: string): void;
      warn(msg: string): void;
      info(msg: string): void;
      http(msg: string): void;
      silly(msg: string): void;
      verbose(msg: string): void;
      debug(msg: string): void;
    }
  }

  namespace Controller {
    interface BaseController {
      all: Action<unknown>;
    }
    interface BookController extends BaseController {
      all: Action<Book>;
    }
  }

  interface Route {
    method: string;
    route: string;
    controller: App.Controller.BaseController;
    action: App.Action<unknown>;
  }
}
