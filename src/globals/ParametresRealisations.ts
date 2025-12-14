import type { GlobalConfig } from 'payload'

export const ParametresRealisations: GlobalConfig = {
  slug: 'parametres-realisations',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titre_page',
      type: 'text',
      label: 'Titre de la page hub réalisations',
      defaultValue: 'Nos Réalisations',
    },
    {
      name: 'description_page',
      type: 'textarea',
      label: 'Texte d\'introduction',
    },
    {
      name: 'nombre_par_page',
      type: 'number',
      label: 'Nombre de réalisations par page',
      defaultValue: 12,
    },
    {
      name: 'afficher_filtres',
      type: 'checkbox',
      label: 'Afficher les filtres',
      defaultValue: true,
    },
    {
      name: 'filtres_actifs',
      type: 'select',
      hasMany: true,
      label: 'Filtres actifs',
      options: [
        { label: 'Type de travaux', value: 'type_travaux' },
        { label: 'Zone', value: 'zone' },
        { label: 'Année', value: 'annee' },
      ],
      defaultValue: ['type_travaux', 'zone'],
    },
  ],
}
