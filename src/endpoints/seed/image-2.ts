import type { Media } from '@/payload-types'

export const image2: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Curving abstract shapes with an orange and blue gradient',
  legende: 'Curving abstract shapes with an orange and blue gradient',
  credit: 'Photo by Andrew Kliatskyi on Unsplash',
}
