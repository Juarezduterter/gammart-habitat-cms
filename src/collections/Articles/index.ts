import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'categorie', 'updatedAt'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenu',
          fields: [
            {
              name: 'titre',
              type: 'text',
              required: true,
              label: 'Titre de l\'article',
            },
            slugField({
              position: undefined,
            }),
            {
              name: 'chapeau',
              type: 'textarea',
              required: true,
              label: 'Introduction / accroche',
              admin: {
                description: '150-300 caractères',
              },
            },
            {
              name: 'contenu',
              type: 'richText',
              required: true,
              label: 'Corps de l\'article',
            },
            {
              name: 'points_cles',
              type: 'array',
              label: 'Résumé "À retenir"',
              fields: [
                {
                  name: 'point',
                  type: 'text',
                  label: 'Point clé',
                },
              ],
            },
          ],
        },
        {
          label: 'Catégorisation',
          fields: [
            {
              name: 'categorie',
              type: 'relationship',
              relationTo: 'categories-blog',
              required: true,
              label: 'Catégorie principale',
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags-blog',
              hasMany: true,
              label: 'Tags associés',
            },
          ],
        },
        {
          label: 'Médias',
          fields: [
            {
              name: 'image_principale',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image de couverture',
            },
            {
              name: 'legende_image',
              type: 'text',
              label: 'Légende de l\'image principale',
            },
            {
              name: 'galerie',
              type: 'array',
              label: 'Images complémentaires',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                },
                {
                  name: 'legende',
                  type: 'text',
                  label: 'Légende',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'afficher_faq',
              type: 'checkbox',
              label: 'Afficher section FAQ',
              defaultValue: false,
            },
            {
              name: 'faq',
              type: 'array',
              label: 'Questions/réponses',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  label: 'Question',
                },
                {
                  name: 'reponse',
                  type: 'textarea',
                  label: 'Réponse',
                },
              ],
            },
          ],
        },
        {
          label: 'Relations',
          fields: [
            {
              name: 'realisations_liees',
              type: 'relationship',
              relationTo: 'realisations',
              hasMany: true,
              label: 'Réalisations liées',
            },
            {
              name: 'articles_lies',
              type: 'relationship',
              relationTo: 'articles',
              hasMany: true,
              label: 'Articles liés',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta_title',
              type: 'text',
              label: 'Titre SEO personnalisé',
            },
            {
              name: 'meta_description',
              type: 'textarea',
              label: 'Description SEO',
            },
            {
              name: 'mot_cle_principal',
              type: 'text',
              label: 'Mot-clé cible',
            },
            {
              name: 'mots_cles_secondaires',
              type: 'array',
              label: 'Mots-clés secondaires',
              fields: [
                {
                  name: 'mot_cle',
                  type: 'text',
                  label: 'Mot-clé',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
