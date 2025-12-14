import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const CategoriesBlog: CollectionConfig = {
  slug: 'categories-blog',
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
      label: 'Nom de la catégorie',
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description de la catégorie',
    },
    {
      name: 'icone',
      type: 'upload',
      relationTo: 'media',
      label: 'Icône de la catégorie',
    },
    {
      name: 'couleur',
      type: 'text',
      label: 'Code couleur hex',
      admin: {
        description: 'Ex: #FF5733',
      },
    },
    {
      name: 'ordre',
      type: 'number',
      label: 'Ordre d\'affichage',
      defaultValue: 0,
    },
    {
      name: 'image_header',
      type: 'upload',
      relationTo: 'media',
      label: 'Image pour la page archive',
    },
    {
      name: 'actif',
      type: 'checkbox',
      label: 'Actif/visible',
      defaultValue: true,
    },
  ],
}
