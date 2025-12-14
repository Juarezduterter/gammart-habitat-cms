import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Realisations: CollectionConfig = {
  slug: 'realisations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'ville', 'date_realisation', 'types_travaux'],
  },
  fields: [
    // Informations générales
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations générales',
          fields: [
            {
              name: 'titre',
              type: 'text',
              required: true,
              label: 'Titre du projet',
              admin: {
                description: 'Ex: "ITE Laine de roche - Strasbourg"',
              },
            },
            slugField({
              position: undefined,
            }),
            {
              name: 'date_realisation',
              type: 'date',
              required: true,
              label: 'Date de réalisation du chantier',
            },
          ],
        },
        {
          label: 'Localisation',
          fields: [
            {
              name: 'ville',
              type: 'text',
              required: true,
              label: 'Nom de la ville',
            },
            {
              name: 'code_postal',
              type: 'text',
              required: true,
              label: 'Code postal',
              admin: {
                description: '5 caractères',
              },
            },
            {
              name: 'departement',
              type: 'relationship',
              relationTo: 'zones',
              label: 'Département',
            },
            {
              name: 'adresse_complete',
              type: 'text',
              label: 'Adresse précise si autorisée',
            },
          ],
        },
        {
          label: 'Caractéristiques du projet',
          fields: [
            {
              name: 'type_bien',
              type: 'select',
              required: true,
              label: 'Type de bien',
              options: [
                { label: 'Maison individuelle', value: 'maison' },
                { label: 'Appartement', value: 'appartement' },
                { label: 'Immeuble collectif', value: 'immeuble' },
                { label: 'Local professionnel', value: 'local_pro' },
                { label: 'Autre', value: 'autre' },
              ],
            },
            {
              name: 'surface_traitee',
              type: 'number',
              label: 'Surface traitée (m²)',
            },
            {
              name: 'duree_chantier',
              type: 'text',
              label: 'Durée des travaux',
              admin: {
                description: 'Ex: "3 semaines"',
              },
            },
            {
              name: 'annee_construction',
              type: 'number',
              label: 'Année de construction du bâtiment',
            },
          ],
        },
        {
          label: 'Travaux réalisés',
          fields: [
            {
              name: 'types_travaux',
              type: 'relationship',
              relationTo: 'types-travaux',
              hasMany: true,
              required: true,
              label: 'Types de travaux effectués',
            },
            {
              name: 'travaux_details',
              type: 'array',
              label: 'Détail de chaque prestation',
              fields: [
                {
                  name: 'prestation',
                  type: 'relationship',
                  relationTo: 'types-travaux',
                  label: 'Type de travaux',
                },
                {
                  name: 'technique',
                  type: 'text',
                  label: 'Technique utilisée',
                },
                {
                  name: 'materiaux',
                  type: 'text',
                  label: 'Matériaux employés',
                },
                {
                  name: 'epaisseur',
                  type: 'text',
                  label: 'Épaisseur si applicable',
                },
                {
                  name: 'surface',
                  type: 'number',
                  label: 'Surface traitée pour cette prestation',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description détaillée',
                },
              ],
            },
          ],
        },
        {
          label: 'Performance énergétique',
          fields: [
            {
              name: 'dpe_avant',
              type: 'select',
              label: 'DPE avant',
              options: [
                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'C', value: 'C' },
                { label: 'D', value: 'D' },
                { label: 'E', value: 'E' },
                { label: 'F', value: 'F' },
                { label: 'G', value: 'G' },
                { label: 'Non renseigné', value: 'non_renseigne' },
              ],
            },
            {
              name: 'dpe_apres',
              type: 'select',
              label: 'DPE après',
              options: [
                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'C', value: 'C' },
                { label: 'D', value: 'D' },
                { label: 'E', value: 'E' },
                { label: 'F', value: 'F' },
                { label: 'G', value: 'G' },
                { label: 'Non renseigné', value: 'non_renseigne' },
              ],
            },
            {
              name: 'gain_energetique',
              type: 'number',
              label: 'Pourcentage d\'économies estimées',
            },
            {
              name: 'economies_annuelles',
              type: 'number',
              label: 'Économies en euros par an',
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
              label: 'Photo de couverture (après travaux)',
            },
            {
              name: 'photo_avant',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Photo avant travaux',
            },
            {
              name: 'photo_apres',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Photo après travaux',
            },
            {
              name: 'galerie',
              type: 'array',
              label: 'Galerie photos complémentaires',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Photo',
                },
                {
                  name: 'legende',
                  type: 'text',
                  label: 'Légende de la photo',
                },
                {
                  name: 'type_photo',
                  type: 'select',
                  label: 'Type de photo',
                  options: [
                    { label: 'Avant', value: 'avant' },
                    { label: 'Après', value: 'apres' },
                    { label: 'Pendant', value: 'pendant' },
                    { label: 'Détail', value: 'detail' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contenu éditorial',
          fields: [
            {
              name: 'contexte',
              type: 'richText',
              label: 'Description du contexte et problématique initiale',
            },
            {
              name: 'solution',
              type: 'richText',
              label: 'Description de la solution apportée',
            },
            {
              name: 'resultats',
              type: 'richText',
              label: 'Description des résultats obtenus',
            },
            {
              name: 'points_cles',
              type: 'array',
              label: 'Points à retenir',
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
          label: 'Témoignage client',
          fields: [
            {
              name: 'temoignage_actif',
              type: 'checkbox',
              label: 'Afficher le témoignage',
              defaultValue: false,
            },
            {
              name: 'temoignage_texte',
              type: 'textarea',
              label: 'Citation du client',
            },
            {
              name: 'temoignage_prenom',
              type: 'text',
              label: 'Prénom du client',
            },
            {
              name: 'temoignage_note',
              type: 'number',
              label: 'Note sur 5',
              min: 0,
              max: 5,
            },
          ],
        },
        {
          label: 'Fiche technique',
          fields: [
            {
              name: 'fiche_technique',
              type: 'array',
              label: 'Données techniques détaillées',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Intitulé',
                  admin: {
                    description: 'Ex: "Isolant"',
                  },
                },
                {
                  name: 'valeur',
                  type: 'text',
                  label: 'Valeur',
                  admin: {
                    description: 'Ex: "Laine de roche Rockwool"',
                  },
                },
              ],
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
              label: 'Description SEO personnalisée',
            },
          ],
        },
      ],
    },
  ],
}
