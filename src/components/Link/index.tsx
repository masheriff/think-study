import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Popup } from '@/payload-types'

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  popup?: {
    id: string | number
    relationTo: 'popups'
    value: Popup | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'popup' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    popup,
  } = props

  // Handle popup type
  if (type === 'popup' && popup) {
    console.log('Rendering popup button for:', popup)
    const popupId = popup.id.toString()
    const size = appearance === 'link' ? 'clear' : sizeFromProps

    // Function to trigger popup
    const handlePopupClick = (e: React.MouseEvent) => {
      e.preventDefault()
      if (typeof window !== 'undefined' && (window as any).triggerPopup) {
        ; (window as any).triggerPopup(popupId)
      }
    }

    // For inline appearance, use Button with appropriate styling
    if (appearance === 'inline') {
      return (
        <Button
          type="button"
          onClick={handlePopupClick}
          variant="link"
          size="clear"
          className={cn(className)}
        >
          {label || children}
        </Button>
      )
    }

    // For button appearances, use the Button component directly
    return (
      <Button
        type="button"
        onClick={handlePopupClick}
        variant={appearance}
        size={size}
        className={className}
      >
        {label || children}
      </Button>
    )
  }

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug
      }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
