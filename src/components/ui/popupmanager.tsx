'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import type { Popup as PopupType } from '@/payload-types'
import Popup from './popup'

// Define the props interface
interface PopupManagerProps {
  nonButtonPopups?: PopupType[]
}

export const PopupManager: React.FC<PopupManagerProps> = ({ nonButtonPopups = [] }) => {
  const [buttonPopups, setButtonPopups] = useState<PopupType[]>([])
  const [activePopup, setActivePopup] = useState<PopupType | null>(null)
  const pathname = usePathname()
  const hasSetupExitIntent = useRef(false)

  // Fetch button-triggered popups on component mount
  useEffect(() => {
    const fetchButtonPopups = async () => {
      try {
        // Fetch only button-triggered popups
        const response = await fetch(
          '/api/popups?where[active][equals]=true&where[publishedAt][exists]=true&where[trigger][equals]=buttonClick&depth=2',
        )
        if (!response.ok) {
          // Log additional information about the error
          const errorText = await response.text()
          console.error(
            `Failed to fetch popups: ${response.status} ${response.statusText}`,
            errorText,
          )
          return // Just return instead of throwing to prevent component errors
        }

        const data = await response.json()
        setButtonPopups(data.docs || [])
      } catch (error) {
        console.error('Failed to fetch button popups:', error)
      }
    }

    fetchButtonPopups()
  }, [])

  // Combine server-side and client-side fetched popups
  const allPopups = useMemo(() =>
    [...nonButtonPopups, ...buttonPopups],
    [nonButtonPopups, buttonPopups]
  )

  // Check if a popup should be shown based on the current page
  const shouldShowOnPage = useCallback((popup: PopupType): boolean => {
    // Check if excluded on current page
    if (
      popup.excludeOnPages?.some((page) => {
        // Handle both object and string/number ID references
        if (typeof page === 'object' && page !== null) {
          const pageSlug = page.slug
          return pathname === (pageSlug === 'home' ? '/' : `/${pageSlug}`)
        }
        return false
      })
    ) {
      return false
    }

    // If displayOnPages is empty or includes current page, show the popup
    if (
      !popup.displayOnPages?.length ||
      popup.displayOnPages.some((page) => {
        // Handle both object and string/number ID references
        if (typeof page === 'object' && page !== null) {
          const pageSlug = page.slug
          return pathname === (pageSlug === 'home' ? '/' : `/${pageSlug}`)
        }
        return false
      })
    ) {
      return true
    }

    return false
  }, [pathname])

  // Check if a popup should be shown based on frequency
  const shouldShowBasedOnFrequency = useCallback((popup: PopupType): boolean => {
    // Skip for browsers without storage
    if (typeof window === 'undefined') return true

    const viewedKey = `popup_viewed_${popup.id}`

    switch (popup.frequency) {
      case 'everyVisit':
        return true

      case 'oncePerSession':
        if (sessionStorage.getItem(viewedKey)) {
          return false
        }
        sessionStorage.setItem(viewedKey, 'true')
        return true

      case 'once24Hours':
        const last24HourView = localStorage.getItem(viewedKey)
        if (last24HourView && Date.now() - parseInt(last24HourView) < 24 * 60 * 60 * 1000) {
          return false
        }
        localStorage.setItem(viewedKey, Date.now().toString())
        return true

      case 'once7Days':
        const last7DayView = localStorage.getItem(viewedKey)
        if (last7DayView && Date.now() - parseInt(last7DayView) < 7 * 24 * 60 * 60 * 1000) {
          return false
        }
        localStorage.setItem(viewedKey, Date.now().toString())
        return true

      case 'onceEver':
        if (localStorage.getItem(viewedKey)) {
          return false
        }
        localStorage.setItem(viewedKey, 'true')
        return true

      default:
        return true
    }
  }, [])

  // Function to manually trigger button click popups
  const triggerButtonPopup = useCallback((popupId: string) => {
    const popup = allPopups.find((p) => String(p.id) === popupId)
    if (popup && shouldShowOnPage(popup) && shouldShowBasedOnFrequency(popup)) {
      setActivePopup(popup)
    }
  }, [allPopups, shouldShowOnPage, shouldShowBasedOnFrequency])

  // Function to close popup
  const closePopup = useCallback(() => {
    setActivePopup(null)
  }, [])

  // Handle popup triggers for non-button popups
  useEffect(() => {

    if (typeof window === 'undefined') return
    if (!nonButtonPopups.length) return

    // Keep track of whether we've already set an active popup in this effect
    let hasSetActivePopup = false

    // Array to collect timeouts for proper cleanup
    const timeoutIds: NodeJS.Timeout[] = []

    // Handle exit intent setup
    let exitIntentHandler: ((e: MouseEvent) => void) | null = null

    // Process popups in priority order: pageLoad, timeDelay, exitIntent
    // First check pageLoad popups
    if (!hasSetActivePopup) {
      const pageLoadPopup = nonButtonPopups.find(
        popup =>
          popup.trigger === 'pageLoad' &&
          shouldShowOnPage(popup) &&
          shouldShowBasedOnFrequency(popup)
      )

      if (pageLoadPopup) {
        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
          setActivePopup(pageLoadPopup)
          hasSetActivePopup = true
        }, 100)
        timeoutIds.push(timeoutId)
      }
    }

    // Then set up timeDelay popups if no pageLoad popup was shown
    if (!hasSetActivePopup) {
      nonButtonPopups.forEach((popup) => {
        if (
          popup.trigger === 'timeDelay' &&
          popup.delay &&
          shouldShowOnPage(popup) &&
          shouldShowBasedOnFrequency(popup)
        ) {
          const timeoutId = setTimeout(() => {
            // Only set active if no popup is currently active
            setActivePopup(prevPopup => {
              if (prevPopup) return prevPopup
              hasSetActivePopup = true
              return popup
            })
          }, popup.delay * 1000)

          timeoutIds.push(timeoutId)
        }
      })
    }

    // Finally, set up exit intent if needed
    if (!hasSetupExitIntent.current) {
      exitIntentHandler = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          const exitIntentPopup = nonButtonPopups.find(
            popup =>
              popup.trigger === 'exitIntent' &&
              shouldShowOnPage(popup) &&
              shouldShowBasedOnFrequency(popup)
          )

          if (exitIntentPopup) {
            setActivePopup(prevPopup => {
              if (prevPopup) return prevPopup
              hasSetActivePopup = true
              return exitIntentPopup
            })
          }
        }
      }

      document.addEventListener('mouseleave', exitIntentHandler)
      hasSetupExitIntent.current = true
    }

    // Cleanup function
    return () => {
      // Clear all timeouts
      timeoutIds.forEach(id => clearTimeout(id))

      // Remove exit intent handler if we created one in this effect
      if (exitIntentHandler && hasSetupExitIntent.current) {
        document.removeEventListener('mouseleave', exitIntentHandler)
      }
    }
  }, [nonButtonPopups, shouldShowOnPage, shouldShowBasedOnFrequency])

  // Expose the trigger function to the global scope for button clicks
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Type-safe window augmentation
    (window as Window & { triggerPopup?: (popupId: string) => void }).triggerPopup = triggerButtonPopup

    return () => {
      delete (window as Window & { triggerPopup?: (popupId: string) => void }).triggerPopup
    }
  }, [triggerButtonPopup])

  return <>{activePopup && <Popup popup={activePopup} onClose={closePopup} />}</>
}

export default PopupManager