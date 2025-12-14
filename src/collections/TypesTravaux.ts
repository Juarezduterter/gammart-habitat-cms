import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const TypesTravaux: CollectionConfig = {
  slug: 'types-travaux',
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
      label: 'Nom du type de travaux',
      admin: {
        description: 'Ex: "Isolation Thermique par l\'Extérieur"',
      },
    },
    {
      name: 'nom_court',
      type: 'text',
      label: 'Acronyme ou nom court',
      admin: {
        description: 'Ex: "ITE"',
      },
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description courte',
    },
    {
      name: 'icone',
      type: 'upload',
      relationTo: 'media',
      label: 'Icône représentative',
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
      name: 'actif',
      type: 'checkbox',
      label: 'Actif/visible',
      defaultValue: true,
    },
  ],
}
