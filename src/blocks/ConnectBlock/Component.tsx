'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import type { ConnectBlock as ConnectBlockType } from '@/payload-types'
// import 'aos/dist/aos.css';

type Props = ConnectBlockType & {
    className?: string
    headingStyles?: TextStyle[]
    connectStyles?: TextStyle[]
    officeStyles?: TextStyle[]
    studentImage: MediaType
    logoImage: MediaType
}

type TextStyle = {
    family: string
    size: string
    color: string
}

type MediaType = {
    url?: string
    alt?: string
    width?: number
    height?: number
}

export const ConnectBlock: React.FC<Props> = (props) => {
    const {
        className,
        mainHeading,
        connectText,
        buttonText,
        headingStyles,
        connectStyles,
    } = props


    return (
        <section className={cn(' px-6 md:px-12', className)}>
            <div className="max-w-5xl mx-auto space-y-12">
                <div>   {/* Top Section */}
                    <div className="text-center space-y-6 mb-16">
                        <h1
                            className="text-4xl md:text-5xl"
                            style={{
                                color: headingStyles?.[0]?.color || '#000000',
                                fontSize: headingStyles?.[0]?.size || '26px',
                                fontFamily: headingStyles?.[0]?.family,
                            }}
                        >
                            {mainHeading}
                        </h1>

                        <p
                            className="text-2xl md:text-3xl italic font-bold"
                            style={{
                                color: connectStyles?.[0]?.color || '#FF0000',
                                fontSize: connectStyles?.[0]?.size || '1.875rem',
                                fontFamily: connectStyles?.[0]?.family,
                            }}
                        >
                            {connectText}
                        </p>

                        <button className="bg-[#65558F] text-white px-8 py-3 rounded-full text-sm">
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ConnectBlock