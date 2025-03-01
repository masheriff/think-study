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
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Left Content - 30% Width */}
                    <div className="w-full md:w-[40.5%] space-y-4">
                        <div>
                            <p
                                className="mb-1"
                                style={{
                                    color: headStyles?.[0]?.color || "#FF0000",
                                    fontSize: headStyles?.[0]?.size || "2.5rem",
                                    fontFamily: headStyles?.[0]?.family,
                                    lineHeight: '1.2',
                                }}
                            >
                                {mainHeading}
                            </p>

                            <p
                                className="text-lg w-full font-semibold "
                                style={{
                                    color: subStyles?.[0]?.color || "#000000",
                                    fontSize: subStyles?.[0]?.size || "14px",
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
                                    color: headStyles?.[0]?.color || "#FF0000",
                                    fontSize: headStyles?.[0]?.size || "2.5rem",
                                    fontFamily: headStyles?.[0]?.family,
                                    lineHeight: '1.2',
                                }}
                            >
                                {secondaryHeading}

                            </h2>

                            <p
                                className="text-lg w-full font-semibold "
                                style={{
                                    color: subStyles?.[0]?.color || "#000000",
                                    fontSize: subStyles?.[0]?.size || "14px",
                                    fontFamily: subStyles?.[0]?.family,
                                }}
                            >
                                {secondarySubheading}
                            </p>
                        </div>

                        <div className="flex flex-row justify-between gap-0">
                            {statistics?.map((stat, index) => (
                                <div key={index} className="flex-1">
                                    <div
                                        className="mb-2"
                                        style={{
                                            color: statStyles?.[0]?.color || "#FF0000",
                                            fontSize: statStyles?.[0]?.size || "2.5rem",
                                            fontFamily: statStyles?.[0]?.family,
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        className="font-semibold"
                                        style={{
                                            color: subStyles?.[0]?.color || "#000000",
                                            fontSize: "13px",
                                            fontFamily: subStyles?.[0]?.family,
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>

                    {/* Right Content - 70% Width */}
                    {/* <div className="w-full md:w-[69%] relative">
                        <div className="absolute top-[65px] left-[50px]">
                            {bText?.map((button, index) => (
                                <button
                                    key={index}
                                    className="bg-[#65558F] me-[8px] mb-2 text-[8px] text-white px-[20px] py-[12px] rounded-full"
                                >
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
                    </div> */}
                    <div className="w-full md:w-[69%] relative flex justify-center">
                        {/* Button Container */}
                        <div className="absolute top-[115px] left-1/2 -translate-x-1/2 flex flex-wrap justify-center items-center gap-2  w-[550px] smax-w-[800px]">
                            {bText?.map((stat, index) => (
                                <button
                                    key={index}
                                    className="bg-[#65558F] text-white px-6 py-2 rounded-full text-[12px] font-semibold flex items-center justify-center"
                                >
                                    {stat?.text}
                                </button>
                            ))}
                        </div>

                        {/* World Map Image */}
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
        </section >
    )
}

export default CareerBlock