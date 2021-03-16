import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

export declare namespace App {
  namespace Config {
    interface Service {
      readonly port: number;
    }
  }

  type Action = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<unknown>;

  namespace Controller {
    interface BaseController {
      all: Action;
    }
    interface BookController extends BaseController {}
  }

  interface Route {
    method: string;
    route: string;
    controller: App.Controller.BaseController;
    action: App.Action;
  }
}
