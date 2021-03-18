import * as Yup from 'yup'
import { App } from '../types/app'
import { schemaAuthorsCreateArray } from './author'

export const schemaBookCreate: Yup.SchemaOf<App.Book.Create.Body> = Yup.object({
  title: Yup.string().required(),
  year: Yup.number().required(),
  authors: Yup.array().of(schemaAuthorsCreateArray),
}).noUnknown(true)
