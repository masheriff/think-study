'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import type { CounselingBlock as CounselingBlockType, Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'

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

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-10">
                <div className="text-left md:w-3/4 w-full">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">{heading}</h2>
                    <p className='text-gray-600 md:text-lg mb-3'>{description}</p>
                    {button && (
                        <Link
                            href={button.url}
                            className="inline-block bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-4 py-2 rounded-3xl transition-colors mb-3"
                        >
                            {button.text}
                        </Link>
                    )}
                </div>
                <div className="relative w-full h-[500px] mt-10">
                    {backgroundImage && (
                        <Image
                            src={(backgroundImage as Media).url || ''}
                            alt="Background"
                            fill
                            className="object-cover rounded-2xl"
                        />
                    )}
                    {/* Embla Carousel */}
                    <div className="overflow-hidden h-full" ref={emblaRef}>
                        <div className="flex h-full items-end px-4">
                            {cards?.map((card, index) => (
                                <div key={index} className="flex-[0_0_32%] mx-4">
                                    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 h-60 relative">
                                        {card.icon && typeof card.icon !== 'number' && (
                                            <div className="absolute top-[10px] right-[-6px] transform -translate-x-1/2 p-1 rounded-full bg-lime-400 w-10 h-10">
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
                                                    <p key={index} className="text-black/80 text-sm">
                                                        {country.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        {card.cardImage && typeof card.cardImage !== 'number' && (
                                            <div className="absolute bottom-[-10px] right-[1px] w-28 h-28 mb-6">
                                                <Image
                                                    src={card.cardImage.url || ''}
                                                    alt="Card Image"
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Dot Indicators */}
                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex justify-center gap-3">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    selectedIndex === index ? "bg-violet-600 w-4" : "bg-violet-200"
                                )}
                                onClick={() => emblaApi?.scrollTo(index)}
                                aria-label={`Scroll to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CounselingBlock