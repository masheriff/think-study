'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import type { CounselingBlock as CounselingBlockType, Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from '@/components/ui/EmblaCarouselDotButton'

type Props = CounselingBlockType & {
    className?: string
}

export const CounselingBlock: React.FC<Props> = (props) => {
    const { className, heading, description, button, backgroundImage, cards } = props

    // Configure Embla Carousel options based on the example
    const options: EmblaOptionsType = {
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 1024px)': { // Desktop
                slidesToScroll: 3
            },
            '(min-width: 768px) and (max-width: 1023px)': { // Tablet
                slidesToScroll: 2
            },
            '(max-width: 767px)': { // Mobile
                align: 'center',
                slidesToScroll: 1
            }
        }
    }

    // Initialize Embla carousel
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    // Use custom hook for dot navigation
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 px-4 py-6">
                <div className="text-left md:w-3/4 w-full">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-5 text-center md:text-left">{heading}</h2>
                    <p className='text-gray-600 md:text-lg mb-5 text-center md:text-left'>{description}</p>
                    {button && (
                        <div className="flex flex-col items-center md:items-start">
                            <Link
                                href={button.url}
                                className="inline-block bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-4 py-2 rounded-3xl transition-colors mb-3"
                            >
                                {button.text}
                            </Link>
                        </div>
                    )}
                </div>
                <div className="relative w-full h-[600px] md:h-[450px] lg:h-[500px] mt-10">
                    {backgroundImage && (
                        <Image
                            src={(backgroundImage as Media).url || ''}
                            alt="Background"
                            fill
                            className="object-cover object-left rounded-2xl"
                            priority
                        />
                    )}

                    {/* Embla Carousel viewport */}
                    <div className="overflow-hidden h-full rounded-2xl embla__viewport" ref={emblaRef}>
                        <div className="flex h-full items-end embla__container">
                            {cards?.map((card, index) => (
                                <div
                                    key={index}
                                    className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_48%] lg:flex-[0_0_32%] m-4 embla__slide"
                                >
                                    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 h-auto sm:h-56 md:h-60 relative">
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
                                            <div className='flex flex-col sm:flex-row justify-center items-center gap-2 p-2 rounded-2xl border border-gray-500'>
                                                {card.countries?.map((country, index) => (
                                                    <p key={index} className="text-black/80 text-sm text-center">
                                                        {country.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        {card.cardImage && typeof card.cardImage !== 'number' && (
                                            <div className="absolute bottom-[-10px] right-[1px] w-24 h-24 md:w-28 md:h-28 mb-6">
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
                    <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex justify-center gap-2 mt-4">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300 focus:outline-none",
                                    selectedIndex === index
                                        ? "bg-violet-600 w-6"
                                        : "bg-violet-200 hover:bg-violet-300"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={selectedIndex === index ? "true" : "false"}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CounselingBlock