'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Popup as PopupType, Media } from '@/payload-types'
import RichText from '../RichText'
import { FormBlock } from '@/blocks/Form/Component'
import { Form } from '@payloadcms/plugin-form-builder/types'

interface PopupProps {
  popup: PopupType
  onClose: () => void
}

// Default appearance settings
const defaultAppearance = {
  width: 'medium' as const,
  position: 'center' as const,
  showCloseButton: true,
  closeOnBackgroundClick: true,
  animation: 'fade' as const,
  backgroundColor: 'white' as const,
}

const Popup = ({ popup, onClose }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(false)

  // Safely access appearance with defaults
  const appearance = popup.appearance || defaultAppearance

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    // Prevent scrolling on the body while popup is open
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && appearance.closeOnBackgroundClick) {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      onClose()
    }, 300)
  }

  // Determine width class based on size
  const getWidthClass = () => {
    switch (appearance.width) {
      case 'small':
        return 'max-w-md'
      case 'medium':
        return 'max-w-2xl'
      case 'large':
        return 'max-w-4xl'
      case 'fullScreen':
        return 'w-full h-full m-0 rounded-none overflow-x-auto'
      default:
        return 'max-w-2xl'
    }
  }

  // Determine position class
  const getPositionClass = () => {
    switch (appearance.position) {
      case 'top':
        return 'items-start pt-16'
      case 'bottom':
        return 'items-end pb-16'
      case 'center':
      default:
        return 'items-center justify-center'
    }
  }

  // Determine animation class
  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-300'

    if (!isVisible) {
      return `${baseClass} opacity-0`
    }

    switch (appearance.animation) {
      case 'fade':
        return `${baseClass} opacity-100`
      case 'slideUp':
        return `${baseClass} opacity-100 transform-none ${!isVisible ? 'translate-y-10' : ''}`
      case 'slideDown':
        return `${baseClass} opacity-100 transform-none ${!isVisible ? '-translate-y-10' : ''}`
      case 'zoomIn':
        return `${baseClass} opacity-100 transform-none ${!isVisible ? 'scale-95' : 'scale-100'}`
      default:
        return `${baseClass} opacity-100`
    }
  }

  // Helper function to determine background color class
  const getBackgroundColorClass = () => {
    switch (appearance.backgroundColor) {
      case 'green':
        return 'bg-[#C1F177]'
      case 'blue':
        return 'bg-[#D9F1FD]'
      case 'white':
      default:
        return 'bg-background'
    }
  }

  // Helper function to determine if media is a Media object
  const isMediaObject = (media: PopupType['media']): media is Media => {
    return typeof media === 'object' && media !== null && 'url' in media
  }

  // Helper function to determine if form is an object with fields (not just an ID)
  const isFormObject = (form: unknown): form is Form => {
    return (
      typeof form === 'object' &&
      form !== null &&
      'fields' in (form as Record<string, unknown>) &&
      Array.isArray((form as Record<string, unknown>).fields)
    )
  }

  // Get media URL and alt text safely
  const getMediaInfo = () => {
    if (!popup.media) return { url: null, alt: null }

    if (isMediaObject(popup.media)) {
      return {
        url: popup.media.url || null,
        alt: popup.media.alt || popup.title,
      }
    }

    return { url: null, alt: null }
  }

  const { url: mediaUrl, alt: mediaAlt } = getMediaInfo()

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 flex ${getPositionClass()} overflow-y-auto p-4`}
      onClick={handleBackgroundClick}
    >
      <div
        className={cn(
          'rounded-2xl shadow-xl relative p-4',
          getWidthClass(),
          getAnimationClass(),
          getBackgroundColorClass(),
        )}
      >
        {appearance.showCloseButton && (
          <button
            className="absolute right-6 top-6 text-white hover:text-black z-10"
            onClick={handleClose}
            aria-label="Close popup"
          >
            <X size={24} />
          </button>
        )}

        {/* Logo image at the top of the content area */}
        <div className="flex flex-col justify-center">
          {mediaUrl && (
            <div className="w-full relative">
              <Image
                src={mediaUrl}
                alt={mediaAlt || ''}
                width={800}
                height={450}
                className="w-full object-cover rounded-t-lg"
                priority
              />
            </div>
          )}
          <Image
            src="/assets/images/popup-logo.svg"
            alt="Popup Logo"
            width={100}
            height={56}
            className="w-auto h-14 -mt-20 z-10"
          />
          {popup.includeForm && popup.form ? (
            isFormObject(popup.form) ? (
              <FormBlock
                enableIntro={false}
                form={popup.form}
                className="px-[10%] -mt-4"
              />
            ) : (
              <p>Form could not be loaded</p>
            )
          ) : null}
        </div>



        <div className="p-6 flex flex-col space-y-4">
          {/* <h2 className="text-2xl font-bold">{popup.title}</h2> */}

          {popup.content && (
            <RichText data={popup.content} enableGutter={false} className="w-full text-xs" />
          )}


        </div>
      </div>
    </div>
  )
}

export default Popup