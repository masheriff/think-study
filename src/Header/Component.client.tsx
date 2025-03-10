'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderNav } from './Nav'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Menu, X } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  useEffect(() => {
    // Close mobile menu when pathname changes
    setIsOpen(false)
  }, [pathname])

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="relative z-20 bg-white">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Logo priority />
        </Link>
        <div className="hidden lg:flex items-center space-x-8">
          <HeaderNav data={data} />
          {data.buttons?.links &&
            data.buttons.links.map(({ link }, idx) => (
              <CMSLink
                key={idx}
                {...link}
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
            <div className="container mx-auto">
              <HeaderNav data={data} />
              {data.buttons?.links &&
                data.buttons.links.map(({ link }, idx) => (
                  <CMSLink
                    key={idx}
                    {...link}
                    className="bg-[#6B5BA9] hover:bg-[#574A8C] text-white px-4 py-2 rounded-3xl transition-colors block text-center mt-4"
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}