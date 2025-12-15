import type { Metadata } from 'next'

import type { Media, Page, Article, Realisation, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.large?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Article> | Partial<Realisation> | null
}): Promise<Metadata> => {
  const { doc } = args

  // Handle different meta structures
  const metaImage = 'meta_image' in (doc || {}) ? (doc as any).meta_image : (doc as any)?.meta?.image
  const metaTitle = 'meta_title' in (doc || {}) ? (doc as any).meta_title : (doc as any)?.meta?.title
  const metaDescription = 'meta_description' in (doc || {}) ? (doc as any).meta_description : (doc as any)?.meta?.description

  const ogImage = getImageURL(metaImage)

  const title = metaTitle
    ? metaTitle + ' | Gammart Habitat'
    : 'Gammart Habitat'

  return {
    description: metaDescription,
    openGraph: mergeOpenGraph({
      description: metaDescription || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
