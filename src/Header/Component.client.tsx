'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderNav } from './Nav'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Menu, X } from 'lucide-react'
import { transformLinkProps } from "@/utilities/transformLinkProps"
interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Lock scrolling
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      // Unlock scrolling
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      }
    }

    // Cleanup function to ensure we don't leave body with modified styles
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isOpen])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed w-full shadow-md z-20 bg-white">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Logo className='h-[40px]' priority />
        </Link>
        <div className="hidden lg:flex items-center space-x-8">
          <HeaderNav data={data} />
          {data.buttons?.links &&
            data.buttons.links.map(({ link }, idx) => (
              <CMSLink
                key={idx}
                {...transformLinkProps(link)}
                className="bg-[#6B5BA9] hover:bg-[#574A8C] text-white px-4 py-2 rounded-3xl transition-colors"
              />
            ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="fixed top-[72px] left-0 right-0 w-full h-screen bg-white shadow-lg p-4 flex flex-col space-y-4 lg:hidden z-30 overflow-y-auto">
            <div className="container">
              <HeaderNav data={data} />
              {data.buttons?.links &&
                data.buttons.links.map(({ link }, idx) => (
                  <CMSLink
                    key={idx}
                    {...transformLinkProps(link)}
                    className="w-2/3 bg-[#6B5BA9] hover:bg-[#574A8C] text-white mx-auto px-4 py-2 rounded-3xl transition-colors block text-center mt-4"
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}