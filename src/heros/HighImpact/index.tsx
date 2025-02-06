'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
export const HighImpactHero: React.FC<Page['hero']> = ({ heading, description, links }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  console.log(heading, 'textColor')
  console.log(description, 'description')

  return (
    <div className="relative">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[50rem] md:text-center">
          {/* Heading */}
          {heading?.content && (
            <div
              className="mb-6"
              style={{
                fontFamily: heading.fontFamily ? `var(--font-${heading.fontFamily.toLowerCase().replace(' ', '-')})` : undefined,
                fontSize: heading.fontSize || undefined,
                color: heading.textColor || undefined,
              }}
            >
              <RichText data={heading.content} enableGutter={false} />
            </div>
          )}

          {/* Description */}
          {description?.content && (
            <div
              className="mb-8"
              style={{
                fontFamily: description.fontFamily ? `var(--font-${description.fontFamily.toLowerCase().replace(' ', '-')})` : undefined,
                fontSize: description.fontSize || undefined,
                color: description.textColor || undefined,
              }}
            >
              <RichText data={description.content} enableGutter={false} />
            </div>
          )}

          {/* Links (Buttons) */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} className='rounded-3xl' />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}