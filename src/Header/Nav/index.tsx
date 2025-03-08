'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react' // Import the down arrow icon

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex flex-col gap-16 items-center lg:flex-row">
      {navItems.map((item, i) => {
        const hasSubMenu = item.subMenu && item.subMenu.length > 0

        return (
          <div key={i} className={`relative ${hasSubMenu ? 'group' : ''}`}>
            <div className="flex items-center">
              <CMSLink {...item.link} appearance="link" />
              {hasSubMenu && (
                <ChevronDown className="ml-1 w-4 h-4" />
              )}
            </div>
            {hasSubMenu && (
              <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md py-2 min-w-[150px] z-10">
                {item.subMenu?.map((subItem, j) => (
                  <li key={j} className="px-4 py-2 hover:bg-gray-100">
                    <CMSLink {...subItem.link} appearance="link" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
