import * as Yup from 'yup'
import { App } from '../types/app'
import { schemaAuthorCreate } from './author'

export const schemaBookCreate: Yup.SchemaOf<App.Book.Create.Body> = Yup.object().shape(
  {
    title: Yup.string().required(),
    year: Yup.number().required(),
    authors: Yup.array().of(schemaAuthorCreate),
  },
)
