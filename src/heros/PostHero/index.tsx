import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Article } from '@/payload-types'

import { Media } from '@/components/Media'

export const PostHero: React.FC<{
  post: Article
}> = ({ post }) => {
  const { categorie, image_principale, updatedAt, titre } = post

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categorie && typeof categorie === 'object' && categorie !== null && (
              <span>{categorie.nom || 'Uncategorized'}</span>
            )}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{titre}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {updatedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={updatedAt}>{formatDateTime(updatedAt)}</time>
              </div>
            )}

          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {image_principale && typeof image_principale !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={image_principale} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
