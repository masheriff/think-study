'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { HeaderNav } from './Nav'
import type { Header } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  console.log('HeaderClient', data);
  const pathname = usePathname()

  useEffect(() => { }, [pathname])

  return (
    <header className="relative z-20 bg-white">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Logo priority />
        </Link>
        <div className="flex items-center space-x-8">
          <HeaderNav data={data} />
          <div className="flex-shrink-0">
            <Link href="/contact">
              <Button
                variant="outline"
                className="bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-4 py-2 rounded-3xl transition-colors"
              >
                Schedule Counseling
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
