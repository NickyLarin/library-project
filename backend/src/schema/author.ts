import * as Yup from 'yup'
import { App } from '../types/app'

export const schemaAuthorCreate: Yup.SchemaOf<App.Author.Create.Body> = Yup.object(
  {
    name: Yup.string().required(),
  },
).noUnknown(true)

export const schemaAuthorsCreateArray = Yup.mixed().test({
  name: 'authors array element check',
  test: async (author) => {
    const res =
      (await schemaAuthorCreate.isValid(author, { strict: true })) ||
      (await Yup.number().positive().isValid(author))
    return res
  },
})
