'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { type ButtonProps } from '@/components/ui/button'
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

export type ClickableCarouselItemProps = {
    children: React.ReactNode
    className?: string
    link: CMSLinkType
}

export const ClickableCarouselItem: React.FC<ClickableCarouselItemProps> = (props) => {
    const {
        children,
        className,
        link
    } = props

    const {
        type,
        newTab,
        reference,
        popup,
        url
    } = link

    // Handle popup type
    if (type === 'popup' && popup) {
        const popupId = typeof popup.id === 'number' ? popup.id.toString() : popup.id.toString()

        // Function to trigger popup
        const handlePopupClick = (e: React.MouseEvent) => {
            e.preventDefault()
            if (typeof window !== 'undefined' && (window as any).triggerPopup) {
                ; (window as any).triggerPopup(popupId)
            }
        }

        return (
            <div
                onClick={handlePopupClick}
                className={cn("cursor-pointer transition-all hover:scale-[1.02]", className)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handlePopupClick(e as unknown as React.MouseEvent)
                    }
                }}
            >
                {children}
            </div>
        )
    }

    // Generate href for reference or custom links
    const href =
        type === 'reference' && typeof reference?.value === 'object' && 'slug' in reference.value && reference.value.slug
            ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
            : url

    if (!href) return <div className={className}>{children}</div>

    const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

    return (
        <Link
            href={href}
            className={cn("block transition-all hover:scale-[1.02]", className)}
            {...newTabProps}
        >
            {children}
        </Link>
    )
}

export default ClickableCarouselItem