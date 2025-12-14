'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Article, Realisation } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = {
  slug?: string | null
  titre?: string | null
  title?: string | null
  categories?: any[] | null
  meta?: {
    description?: string | null
    image?: any
  } | null
  meta_title?: string | null
  meta_description?: string | null
  image_principale?: any
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'articles' | 'realisations'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, titre, title, meta_description, image_principale } = doc || {}
  const { description, image: metaImage } = meta || {}

  const finalImage = metaImage || image_principale
  const finalDescription = description || meta_description

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || titre || title
  const sanitizedDescription = finalDescription?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!finalImage && <div className="">No image</div>}
        {finalImage && typeof finalImage !== 'string' && <Media resource={finalImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory, nom } = category as any

                    const categoryTitle = nom || titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {sanitizedDescription && <div className="mt-2"><p>{sanitizedDescription}</p></div>}
      </div>
    </article>
  )
}
