import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif pour SEO et accessibilité',
    },
    {
      name: 'legende',
      type: 'text',
      label: 'Légende descriptive',
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Crédit photo si applicable',
    },
    {
      name: 'categorie_media',
      type: 'select',
      label: 'Catégorie',
      options: [
        { label: 'Réalisation', value: 'realisation' },
        { label: 'Blog', value: 'blog' },
        { label: 'Logo', value: 'logo' },
        { label: 'Icône', value: 'icone' },
        { label: 'Autre', value: 'autre' },
      ],
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
      },
      {
        name: 'medium',
        width: 400,
        height: 400,
      },
      {
        name: 'large',
        width: 1200,
        height: 1200,
      },
    ],
  },
}
