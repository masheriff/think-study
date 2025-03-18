'use client'
import React from 'react'
import type { ServiceBlock as ServiceBlockType } from '@/payload-types'
import { DownArrow } from '../../components/thinkstudy-svg/index'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from '@/components/ui/EmblaCarouselDotButton'
import { cn } from '@/utilities/ui'

type Props = ServiceBlockType & {
    className?: string;
    downImage: string;
}

export const ServiceBlock: React.FC<Props> = (props) => {
    const {
        mainHeading,
        description,
        subDescription,
        services,
        backgroundimage,
        buttonText,
    } = props

    // Configure Embla Carousel options
    const options: EmblaOptionsType = {
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        slidesToScroll: 1,
        breakpoints: {
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
        <div className='container'>
            <section
                className="mb-12 rounded-3xl py-8 px-4 md:px-8"
                style={{
                    backgroundColor: '#D9F1FD',
                    backgroundImage: typeof backgroundimage === 'object' && backgroundimage?.url ? `url(${backgroundimage.url})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="w-full lg:w-[60%] text-center mb-8 bg-white/20 backdrop-blur-lg border border-[#FFFFFF] rounded-xl p-8">
                        <h2 className="text-[#FF0000] mb-1 italic font-medium font-mynerve text-[26px]">
                            {mainHeading}
                        </h2>
                        <p className="mb-4 text-sm">
                            {description}
                        </p>
                        <p className="mb-8 text-sm">
                            {subDescription}
                        </p>
                        <div className="flex items-center justify-start">
                            <div className="md:inline-block w-full md:w-auto bg-[#C1F177] px-8 py-3 rounded-xl">
                                <h3 className="text-base">
                                    {buttonText}
                                </h3>
                            </div>
                            <div className="hidden md:flex flex-row items-center space-x-2 ml-4">
                                <DownArrow />
                                <DownArrow />
                                <DownArrow />
                                <DownArrow />
                            </div>
                        </div>
                    </div>

                    {/* Services for Desktop */}
                    <div className="hidden lg:grid lg:grid-cols-4 gap-8">
                        {services?.map((service, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-3xl flex flex-col items-center justify-center bg-[#C1F177] aspect-square"
                            >
                                <h4 className="text-xl text-center font-medium mb-3">
                                    {service.title}
                                </h4>
                                <p className="text-sm text-center">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Services Carousel for Mobile and Tablet */}
                    <div className="relative lg:hidden">
                        <div
                            className="overflow-hidden embla__viewport -mx-4"
                            ref={emblaRef}
                        >
                            <div className="flex embla__container">
                                {services?.map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex-[0_0_100%] sm:flex-[0_0_50%] embla__slide px-4"
                                    >
                                        <div className="p-6 rounded-3xl h-[300px] flex flex-col items-center justify-center bg-[#C1F177]">
                                            <h4 className="text-xl text-center font-medium mb-3">
                                                {service.title}
                                            </h4>
                                            <p className="text-sm text-center">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dot Indicators for Mobile/Tablet */}
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
        </div>
    )
}

export default ServiceBlock