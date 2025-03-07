'use client'

import React from 'react'
import Image from 'next/image'
import type { CareerBlock as CareerBlockType } from '@/payload-types'
import TextHighlighter from '@/components/ui/texthighlighter'
import { Button } from '@/components/ui/button'

type Props = CareerBlockType & {
    className?: string
    worldMapImage: MediaType
}

type MediaType = {
    url?: string
    alt?: string
}

export const CareerBlock: React.FC<Props> = (props) => {
    const {
        mainHeading,
        mainSubheading,
        secondaryHeading,
        secondarySubheading,
        statistics,
        bText,
        worldMapImage,
    } = props

    return (
        <section className="container">
            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Left Content - 30% Width */}
                    <div className="w-full md:w-[30%] space-y-4">
                        <div>
                            <p
                                className="mb-1 text-[#FF0000] text-3xl"
                                style={{
                                    lineHeight: '1.2',
                                }}
                            >
                                <TextHighlighter text={mainHeading} />
                            </p>

                            <p className="text-lg w-full ">{mainSubheading}</p>
                        </div>

                        <div>
                            <h2
                                className="mb-1 text-[#FF0000] text-3xl"
                                style={{
                                    lineHeight: '1.2',
                                }}
                            >
                                <TextHighlighter text={secondaryHeading} />
                            </h2>

                            <p className="text-lg w-full">{secondarySubheading}</p>
                        </div>

                        <div className="flex flex-row justify-between gap-0">
                            {statistics?.map((stat, index) => (
                                <div key={index} className="flex-1">
                                    <div className="mb-2 text-[#FF0000] text-3xl">
                                        {stat.value}
                                    </div>
                                    <div
                                        className="font-semibold"
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - 70% Width */}
                    <div className="md:w-[70%] relative flex justify-center">
                        {/* Button Container */}
                        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 flex flex-wrap justify-center items-center gap-2 w-[550px] smax-w-[800px]">
                            {bText?.map((stat, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-4 py-2 rounded-3xl transition-colors"
                                >
                                    {stat?.text}
                                </Button>
                            ))}
                        </div>

                        {/* World Map Image */}
                        {worldMapImage?.url && (
                            <Image
                                src={worldMapImage.url}
                                alt={worldMapImage.alt || 'World Map'}
                                width={500}
                                height={390}
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