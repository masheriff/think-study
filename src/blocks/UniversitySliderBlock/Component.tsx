'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from '@/components/ui/EmblaCarouselDotButton';

import type { UniversitySliderBlock as UniversitySliderBlockType } from '@/payload-types';

type Props = UniversitySliderBlockType & {
    className?: string;
};

export const UniversitySliderBlock: React.FC<Props> = ({ slides, className }) => {
    // Configure Embla Carousel options
    const options: EmblaOptionsType = {
        align: 'center',
        loop: true,
        skipSnaps: false,
    };

    // Initialize Embla carousel
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    // Use custom hook for dot navigation
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    return (
        <section className={cn("mx-4 md:container md:px-0 relative", className)}>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides?.map((slide, index) => (
                        <div
                            key={index}
                            className='relative h-[600px] md:h-[786px] flex-[0_0_100%] flex flex-col items-end justify-end p-8'
                        >
                            <div className="bg-white rounded-2xl w-full md:w-2/5 p-4 flex flex-row items-center justify-between space-x-4 z-10">
                                {typeof slide.universityImage !== 'number' && (
                                    <Image
                                        src={slide.universityImage.url || ''}
                                        alt={slide.universityImage.alt || 'University image'}
                                        width={80}
                                        height={80}
                                        className='h-12 md:h-16 w-auto'
                                    />
                                )}
                                <div className='bg-[#C1F177] rounded-xl md:text-xl p-3'>
                                    {slide.title}
                                </div>
                            </div>
                            {typeof slide.backgroundImage !== 'number' && (
                                <Image
                                    src={slide.backgroundImage.url || ''}
                                    alt={slide.backgroundImage.alt || 'Testimonial image'}
                                    fill
                                    priority
                                    className="object-cover rounded-3xl -z-10"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
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
        </section>
    );
};

export default UniversitySliderBlock;