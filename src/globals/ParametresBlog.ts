import type { GlobalConfig } from 'payload'

export const ParametresBlog: GlobalConfig = {
  slug: 'parametres-blog',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titre_page',
      type: 'text',
      label: 'Titre de la page hub blog',
      defaultValue: 'Blog',
    },
    {
      name: 'description_page',
      type: 'textarea',
      label: 'Texte d\'introduction',
    },
    {
      name: 'nombre_par_page',
      type: 'number',
      label: 'Nombre d\'articles par page',
      defaultValue: 12,
    },
  ],
}
