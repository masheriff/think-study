'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderNav } from './Nav'
import type { Header } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'
import { Menu, X } from "lucide-react";

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()

  useEffect(() => { }, [pathname])
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-20 bg-white">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Logo priority />
        </Link>
        {/* <div className="flex items-center space-x-8">
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
        </div> */}
        <div className="hidden lg:flex items-center space-x-8">
          <HeaderNav data={data} />
          <Link href="/contact">
            <button className="bg-[#6B5BA9] hover:bg-[#574A8C] text-white px-4 py-2 rounded-3xl transition-colors">
              Schedule Counseling
            </button>
          </Link>
        </div>

        {/* mobile View */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-16 right-0 w-64 bg-white shadow-lg p-4 flex flex-col space-y-4 lg:hidden">
            <HeaderNav data={data} />
            <Link href="/contact">
              <button className="bg-[#6B5BA9] hover:bg-[#574A8C] text-white px-4 py-2 rounded-3xl transition-colors w-full">
                Schedule Counseling
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
