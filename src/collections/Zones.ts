import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Zones: CollectionConfig = {
  slug: 'zones',
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
      label: 'Nom du département ou zone',
    },
    {
      name: 'code',
      type: 'text',
      label: 'Code département',
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'actif',
      type: 'checkbox',
      label: 'Zone active',
      defaultValue: true,
    },
  ],
}
