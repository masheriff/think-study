'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import TextHighlighter from '@/components/ui/texthighlighter'

export const HighImpactHero: React.FC<Page['hero']> = ({ heading, description, links }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div className="relative">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[50rem] md:text-center">
          {/* Heading */}
          {heading && (
            <div
              className="mb-6"
              style={{
                fontFamily: heading.fontFamily ? `var(--font-${heading.fontFamily.toLowerCase().replace(' ', '-')})` : undefined,
                fontSize: heading.fontSize || undefined,
              }}
            >
              <h1 className="text-4xl font-semibold p-4">
                <TextHighlighter text={heading.content || ''} />
              </h1>
            </div>
          )}

          {/* Description */}
          {description && (
            <div
              className="mb-8"
              style={{
                fontFamily: description.fontFamily ? `var(--font-${description.fontFamily.toLowerCase().replace(' ', '-')})` : undefined,
                fontSize: description.fontSize || undefined,
              }}
            >
              <p className="text-lg">{description.content}</p>
            </div>
          )}

          {/* Links (Buttons) */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} className="rounded-3xl" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}