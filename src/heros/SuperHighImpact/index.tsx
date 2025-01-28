'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const SuperHighImpactHero: React.FC<Page['hero']> = ({
  links,
  richText,
  bottomRichText,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Content Container */}
      <div className="container relative z-10 pt-4">
        <div className="max-w-[750px] mx-auto text-center">
          {richText && <RichText className="mb-8" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 flex-wrap">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
          <hr className="m-10" />
          {bottomRichText && (
            <RichText className="mt-8" data={bottomRichText} enableGutter={false} />
          )}
        </div>
      </div>
    </div>
  )
}
