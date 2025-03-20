'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import TextHighlighter from '@/components/ui/texthighlighter'

export const HighImpactHero: React.FC<Page['hero']> = ({ heading, description, links }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return (
    <div className="relative w-full">
      <div className="container mx-auto px-4 sm:px-6 z-10 relative flex items-center justify-center pt-10 pb-0 sm:pt-16 md:pt-20 overflow-hidden">
        <div className="w-full max-w-3xl text-center">
          {/* Heading */}
          {heading && (
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl font-semibold px-2 sm:px-4 leading-normal sm:leading-normal">
                <TextHighlighter text={heading.content || ''} />
              </h1>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mb-8 sm:mb-10 md:mb-12 px-2">
              <p className="text-base sm:text-lg">{description.content}</p>
            </div>
          )}

          {/* Links (Buttons) */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} className="rounded-3xl text-sm sm:text-base inline-block" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}