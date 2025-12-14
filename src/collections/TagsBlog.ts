import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const TagsBlog: CollectionConfig = {
  slug: 'tags-blog',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'nom',
  },
  fields: [
    {
      name: 'nom',
      type: 'text',
      required: true,
      label: 'Nom du tag',
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'actif',
      type: 'checkbox',
      label: 'Actif/visible',
      defaultValue: true,
    },
  ],
}
