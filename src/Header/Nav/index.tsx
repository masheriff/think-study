'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation' // Import for path tracking
import { transformLinkProps } from "@/utilities/transformLinkProps"

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() // Get current path for active state

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

  // Reset active submenu when path changes
  useEffect(() => {
    setActiveSubmenu(null)
  }, [pathname])

  // Toggle submenu on mobile/tablet
  const toggleSubmenu = (index: number) => {
    if (screenSize !== 'desktop') {
      setActiveSubmenu(activeSubmenu === index ? null : index)
    }
  }

  // Check if link is active
  const isLinkActive = (link: any) => {
    if (!link) return false

    // Get the actual URL from the link object based on its type
    let href = ''
    if (link.type === 'custom' && link.url) {
      href = link.url
    } else if (link.type === 'reference' && link.reference) {
      // For reference links, we need to use the slug
      // This assumes pages and posts have slugs
      if (link.reference.value && typeof link.reference.value !== 'number') {
        href = `/${link.reference.value.slug || ''}`
      }
    }

    if (!href) return false

    // Clean up URLs for comparison
    const currentPath = pathname.replace(/\/$/, '')
    const linkPath = href.replace(/^https?:\/\/[^\/]+/, '').replace(/\/$/, '')

    // Check for exact match or if the current path starts with the link path
    return currentPath === linkPath ||
      (linkPath !== '/' && currentPath.startsWith(linkPath))
  }

  return (
    <nav ref={navRef} className="flex flex-col md:gap-6 lg:gap-8 lg:flex-row">
      {navItems.map((item, i) => {
        const hasSubMenu = item.subMenu && item.subMenu.length > 0
        const isSubMenuOpen = activeSubmenu === i

        // Check if this item or any of its subitems are active
        const isCurrentItemActive = isLinkActive(item.link)
        const isAnySubItemActive = hasSubMenu && item.subMenu?.some(
          subItem => isLinkActive(subItem.link)
        )

        // Item is active if it's the current path or one of its subitems is
        const isActive = isCurrentItemActive || isAnySubItemActive

        return (
          <div key={i} className={`
            relative w-full
            ${hasSubMenu ? (screenSize === 'desktop' ? 'group' : '') : ''}
            ${(screenSize === 'mobile' || screenSize === 'tablet') ? 'border-b border-gray-100' : ''}
          `}>
            <div
              className={`
                flex items-center cursor-pointer h-16
                ${(screenSize === 'mobile' || screenSize === 'tablet') ? 'justify-between' : 'justify-center'}
                ${isActive ? 'text-[#F7674F]' : ''}
                ${hasSubMenu && isSubMenuOpen ? 'text-[#F7674F]' : ''}
              `}
              onClick={() => hasSubMenu && toggleSubmenu(i)}
            >
              <CMSLink
                {...transformLinkProps(item.link)}
                appearance="link"
                className={`
                  text-sm md:text-base px-2 py-2 md:px-4 md:py-2
                  transition-colors duration-200 
                  hover:text-[#F7674F]
                  ${isActive ? 'text-[#F7674F] font-medium' : ''}
                  ${(screenSize === 'mobile' || screenSize === 'tablet') ? 'text-base' : ''}
                `}
              />
              {hasSubMenu && (
                <ChevronDown
                  className={`
                    ml-1 w-4 h-4 transition-transform duration-200
                    ${isSubMenuOpen ? 'transform rotate-180 text-[#F7674F]' : ''}
                    ${isActive && !isSubMenuOpen ? 'text-[#F7674F]' : ''}
                  `}
                />
              )}
            </div>

            {/* Desktop dropdown menu */}
            {hasSubMenu && screenSize === 'desktop' && (
              <ul
                className={`
                  absolute bg-[#C1F177] shadow-md py-2 z-10
                  rounded-2xl
                  transition-all duration-200 ease-in-out
                  left-0 min-w-[220px]
                  hidden group-hover:block opacity-0 group-hover:opacity-100 
                  translate-y-1 group-hover:translate-y-0 top-[95%]
                `}
              >
                {item.subMenu?.map((subItem, j) => {
                  const isSubItemActive = isLinkActive(subItem.link)

                  return (
                    <li
                      key={j}
                    >
                      <CMSLink
                        {...transformLinkProps(subItem.link)}
                        appearance="link"
                        className={`
                          text-sm block w-full transition-colors duration-150 px-4 py-2
                          ${isSubItemActive ? 'font-bold' : ''}
                        `}
                      />
                    </li>
                  )
                })}
              </ul>
            )}

            {/* Mobile/Tablet accordion submenu */}
            {hasSubMenu && (screenSize === 'mobile' || screenSize === 'tablet') && (
              <div
                className={`
                  w-full transition-all duration-300 ease-in-out overflow-hidden
                  ${isSubMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <ul className="bg-[#C1F177] rounded-2xl">
                  {item.subMenu?.map((subItem, j) => {
                    const isSubItemActive = isLinkActive(subItem.link)

                    return (
                      <li
                        key={j}
                      >
                        <CMSLink
                          {...transformLinkProps(subItem.link)}
                          appearance="link"
                          className={`
                            text-sm flex px-4 items-center h-10 w-full  transition-colors duration-150
                            ${isSubItemActive ? 'font-bold' : ''}
                          `}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}