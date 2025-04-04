'use client'

import React from 'react'
import { InlineWidget } from 'react-calendly'
import type { CalendlyBlock as CalendlyBlockType } from '@/payload-types'

type MediaType = {
    url?: string
    alt?: string
}

type Props = CalendlyBlockType & {
    className?: string
    worldMapImage?: MediaType
}

export const CalendlyBlock: React.FC<Props> = (props) => {
    const {
        calendlyURL,
        primaryColor = '65558f',
        textColor = '000000',
        className,
    } = props

    // Prepare Calendly URL parameters
    const pageSettings = {
        hideEventTypeDetails: false,
        hideLandingPageDetails: true,
        hideGdprBanner: true,
        primaryColor: primaryColor?.replace('#', '') || '65558f',
        textColor: textColor?.replace('#', '') || '000000',
    }

    return (
        <section className={`w-full -mt-[60px] md:-mt-[120px] ${className || ''}`}>
            <div className="w-full mx-auto">
                {calendlyURL ? (
                    <InlineWidget
                        url={calendlyURL}
                        pageSettings={pageSettings}
                        styles={{
                            height: '1100px',
                        }}
                    />
                ) : (
                    <div className="bg-gray-100 rounded-lg p-6 text-center h-[700px] flex items-center justify-center">
                        <p className="text-gray-500">Please configure a Calendly URL to display the booking widget.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default CalendlyBlock