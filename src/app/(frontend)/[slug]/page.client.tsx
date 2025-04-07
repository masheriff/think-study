'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Popup } from '@/payload-types'
import PopupManager from '@/components/ui/popupmanager'

interface PageClientProps {
  nonButtonPopups?: Popup[]
}

const PageClient: React.FC<PageClientProps> = ({ nonButtonPopups = [] }) => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])
  return (
    <>
      <PopupManager nonButtonPopups={nonButtonPopups} />
    </>
  )
}

export default PageClient
