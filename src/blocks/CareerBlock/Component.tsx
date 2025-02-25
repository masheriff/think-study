'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { CareerBlock as CareerBlockType } from '@/payload-types'
// import 'aos/dist/aos.css';

type Props = CareerBlockType & {
    className?: string
    headStyles?: TextStyle[]
    subStyles?: TextStyle[]
    statStyles?: TextStyle[]
    buttonStyles?: buttonStyles[]
    worldMapImage: MediaType

}

type TextStyle = {
    family: string
    size: string
    color: string
}
type buttonStyles = {
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

export const CareerBlock: React.FC<Props> = (props) => {
    const {
        className,
        mainHeading,
        mainSubheading,
        secondaryHeading,
        secondarySubheading,
        statistics,
        headStyles,
        subStyles,
        statStyles,
        bText,
        worldMapImage,
    } = props


    return (
        <section className={cn('py-16 px-6 md:px-12    ', className)}>
            <div className="max-w-5xl mx-auto relative" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-4">
                        <div>
                            <h1
                                className="mb-1"
                                style={{
                                    color: headStyles?.[0]?.color,
                                    fontSize: headStyles?.[0]?.size,
                                    fontFamily: headStyles?.[0]?.family,
                                }}
                            >
                                {mainHeading?.split(' ').slice(0, -1).join(' ')} <br />
                                {mainHeading?.split(' ').slice(-1)}
                            </h1>

                            <p
                                className="text-lg w-[400px]"
                                style={{
                                    color: subStyles?.[0]?.color || '#000000',
                                    fontSize: subStyles?.[0]?.size || '1.125rem',
                                    fontFamily: subStyles?.[0]?.family,
                                }}
                            >
                                {mainSubheading}
                            </p>
                        </div>

                        <div>
                            <h2
                                className="mb-1"
                                style={{
                                    color: headStyles?.[0]?.color || '#FF0000',
                                    fontSize: headStyles?.[0]?.size || '2.5rem',
                                    fontFamily: headStyles?.[0]?.family,
                                }}
                            >
                                {secondaryHeading?.split(' ').slice(0, 2).join(' ')} <br />
                                {secondaryHeading?.split(' ').slice(2).join(' ')}
                            </h2>

                            <p
                                className="text-lg w-[400px]"
                                style={{
                                    color: subStyles?.[0]?.color || '#000000',
                                    fontSize: subStyles?.[0]?.size || '1.125rem',
                                    fontFamily: subStyles?.[0]?.family,
                                }}
                            >
                                {secondarySubheading}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {statistics?.map((stat, index) => (
                                <div key={index}>
                                    <div
                                        className=" mb-2"
                                        style={{
                                            color: statStyles?.[0]?.color || '#FF0000',
                                            fontSize: statStyles?.[0]?.size || '2.5rem',
                                            fontFamily: statStyles?.[0]?.family,
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - World Map */}
                    <div className="relative">

                        <div className='absolute top-[65px] left-[50px]'>

                            {bText?.map((button, index) => (
                                <button key={index} className="bg-[#65558F] me-[8px] mb-2 text-[8px] text-white px-[20px] py-[12px] rounded-full">
                                    {button.text}
                                </button>
                            ))}

                        </div>
                        {worldMapImage?.url && (
                            <Image
                                src={worldMapImage.url}
                                alt={worldMapImage.alt || "World Map"}
                                width={worldMapImage.width || 800}
                                height={worldMapImage.height || 600}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CareerBlock