import { Request, Response } from 'express'
import { HttpError } from './error/HttpError'
import { App } from './types/app'

export const error = (err: HttpError, req: Request, res: Response): void => {
  const body: App.Error.Body = {
    message: err.message,
    status: err.status,
    timestamp: err.timestamp.toISOString(),
    method: req.method,
    path: req.path,
    errors: err.errors,
  }

  res.status(err.status).json(body)
}
