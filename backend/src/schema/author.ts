import * as Yup from 'yup'
import { App } from '../types/app'

export const schemaAuthorCreate: Yup.SchemaOf<App.Author.Create.Body> = Yup.object().shape(
  {
    name: Yup.string().required(),
  },
)
