import Script from 'next/script'
import React from 'react'

import { themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // Always set light theme regardless of user preference or localStorage
    var themeToSet = 'light'
    
    // Optional: Save to localStorage to persist the forced theme
    window.localStorage.setItem('${themeLocalStorageKey}', themeToSet)
    
    // Set the theme attribute on document
    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
  // return (
  //   // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  //   <Script
  //     dangerouslySetInnerHTML={{
  //       __html: `
  // (function () {
  //   function getImplicitPreference() {
  //     var mediaQuery = '(prefers-color-scheme: dark)'
  //     var mql = window.matchMedia(mediaQuery)
  //     var hasImplicitPreference = typeof mql.matches === 'boolean'

  //     if (hasImplicitPreference) {
  //       return mql.matches ? 'dark' : 'light'
  //     }

  //     return null
  //   }

  //   function themeIsValid(theme) {
  //     return theme === 'light' || theme === 'dark'
  //   }

  //   var themeToSet = '${defaultTheme}'
  //   var preference = window.localStorage.getItem('${themeLocalStorageKey}')

  //   if (themeIsValid(preference)) {
  //     themeToSet = preference
  //   } else {
  //     var implicitPreference = getImplicitPreference()

  //     if (implicitPreference) {
  //       themeToSet = implicitPreference
  //     }
  //   }

  //   document.documentElement.setAttribute('data-theme', themeToSet)
  // })();
  // `,
  //     }}
  //     id="theme-script"
  //     strategy="beforeInteractive"
  //   />
  // )


}
