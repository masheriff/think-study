'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const navRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside nav to close submenus
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveSubmenu(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize('mobile')
      } else if (width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Toggle submenu on mobile/tablet
  const toggleSubmenu = (index: number) => {
    if (screenSize !== 'desktop') {
      setActiveSubmenu(activeSubmenu === index ? null : index)
    }
  }

  return (
    <nav ref={navRef} className="flex flex-col gap-3 md:gap-6 lg:gap-8 lg:flex-row">
      {navItems.map((item, i) => {
        const hasSubMenu = item.subMenu && item.subMenu.length > 0
        const isActive = activeSubmenu === i

        return (
          <div key={i} className={`
            relative 
            ${hasSubMenu ? (screenSize === 'desktop' ? 'group' : '') : ''}
          `}>
            <div
              className={`
                flex items-center justify-center cursor-pointer
                ${hasSubMenu && isActive ? 'text-[#F7674F]' : ''}
              `}
              onClick={() => hasSubMenu && toggleSubmenu(i)}
            >
              <CMSLink
                {...item.link}
                appearance="link"
                className={`
                  text-sm md:text-base px-2 py-1 md:px-4 md:py-2
                  transition-colors duration-200 
                  hover:text-[#F7674F]
                `}
              />
              {hasSubMenu && (
                <ChevronDown
                  className={`
                    ml-1 w-4 h-4 transition-transform duration-200
                    ${isActive ? 'transform rotate-180 text-[#F7674F]' : ''}
                  `}
                />
              )}
            </div>
            {hasSubMenu && (
              <ul
                className={`
                  absolute bg-white shadow-md py-2 z-10
                  border border-gray-100 rounded-md
                  transition-all duration-200 ease-in-out
                  
                  ${screenSize === 'mobile'
                    ? 'left-0 right-0 w-64 max-w-full'
                    : screenSize === 'tablet'
                      ? 'left-1/2 -translate-x-1/2 min-w-[200px]'
                      : 'left-0 min-w-[220px]'
                  }
                  
                  ${screenSize === 'desktop'
                    ? 'hidden group-hover:block opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 top-[calc(100%_+_0.15rem)]'
                    : isActive
                      ? 'block opacity-100 top-full mt-1'
                      : 'hidden opacity-0'
                  }
                `}
              >
                {item.subMenu?.map((subItem, j) => (
                  <li
                    key={j}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <CMSLink
                      {...subItem.link}
                      appearance="link"
                      className="text-sm block w-full transition-colors duration-150 hover:text-[#F7674F]"
                    />
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