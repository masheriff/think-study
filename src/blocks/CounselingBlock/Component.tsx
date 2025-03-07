/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import type { CounselingBlock as CounselingBlockType } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/ui/button'

type Props = CounselingBlockType & {
    className?: string
}

export const CounselingBlock: React.FC<Props> = (props) => {
    const { className, heading, description, button, backgroundImage, cards } = props

    // Embla carousel setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        skipSnaps: false,
        dragFree: false,
        containScroll: 'keepSnaps',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': {
                align: 'center',
                slidesToScroll: 1
            }
        }
    })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [scrollProgress, setScrollProgress] = useState(0)

    // Update scroll progress
    const updateScrollProgress = useCallback(() => {
        if (!emblaApi) return
        setScrollProgress(emblaApi.scrollProgress() * 100)
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        onSelect()
        updateScrollProgress()
        setScrollSnaps(emblaApi.scrollSnapList())

        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('scroll', updateScrollProgress)
        emblaApi.on('reInit', updateScrollProgress)

        return () => {
            emblaApi?.off('select', onSelect)
            emblaApi?.off('reInit', onSelect)
            emblaApi?.off('scroll', updateScrollProgress)
            emblaApi?.off('reInit', updateScrollProgress)
        }
    }, [emblaApi, onSelect, updateScrollProgress])

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-10">
                <div className="text-left md:w-3/4 w-full">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">{heading}</h2>
                    <p className='text-gray-600 md:text-lg mb-3'>{description}</p>
                    {button && (
                        <Button
                            className="bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-4 py-2 rounded-3xl transition-colors mb-3"
                            asChild
                        >
                            <a href={button.url}>{button.text}</a>
                        </Button>
                    )}
                </div>
                <div className="relative w-full h-[450px] mt-10">
                    {typeof backgroundImage !== 'number' && backgroundImage && (
                        <Image
                            src={backgroundImage.url || ''}
                            alt="Background"
                            fill
                            className="object-fill rounded-2xl"
                        />
                    )}
                    {/* Embla Carousel */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <div className="overflow-hidden h-full" ref={emblaRef}>
                            <div className="flex h-full items-center">
                                {cards?.map((card, index) => (
                                    <div key={index} className="flex-[0_0_33.33%] mx-4">
                                        <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl h-60 relative">
                                            {typeof card.icon !== 'number' && card.icon && (
                                                <div className="absolute top-[10px] right-[-6px] transform -translate-x-1/2 p-1 rounded-full bg-[#C5FF64] w-10 h-10">
                                                    <Image
                                                        src={card.icon.url || ''}
                                                        alt="Icon"
                                                        width={40}
                                                        height={40}
                                                        className="p-1"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-col items-center justify-center mt-10">
                                                <h3 className="text-base font-light mb-2">{card.title}</h3>
                                                <p className="text-black-600 font-semibold mb-2">{card.courseName}</p>
                                                <div className='flex flex-row justify-center items-center gap-2 p-2 rounded-2xl border border-gray-500'>
                                                    {card.countries?.map((country, index) => (
                                                        <p key={index} className="text-black font-semibold text-sm">
                                                            {country.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Scroll Progress Bar with Static Vertical Line */}
                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex items-center justify-center w-3/4">
                        {/* Static Vertical Line */}
                        <div className="w-[3px] h-7 bg-violet-600 mr-1" />

                        {/* Progress Bar */}
                        <div className="w-1/3 h-2 bg-violet-200 rounded-r-full relative" >
                            <div
                                className="h-2 bg-violet-600 rounded-full transition-all"
                                style={{ width: `${scrollProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CounselingBlock
