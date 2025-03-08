import { type SchemaTypeDefinition } from 'sanity'
import { OrderSchema } from './order'
import { CustomerShema } from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [OrderSchema,CustomerShema],
}
