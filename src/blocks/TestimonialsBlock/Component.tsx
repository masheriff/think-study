"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types';
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { DotButton, useDotButton } from '@/components/ui/EmblaCarouselDotButton';

type Props = TestimonialsBlockType & {
    className?: string
}

export const TestimonialsBlock: React.FC<Props> = (props) => {
    const { className, heading, description, testimonials } = props;

    // Updated carousel configuration with WheelGesturesPlugin
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            skipSnaps: false,
            dragFree: true,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            breakpoints: {
                "(min-width: 1024px)": { // Desktop
                    slidesToScroll: 1,
                    align: "start",
                },
                "(min-width: 768px) and (max-width: 1023px)": { // Tablet
                    slidesToScroll: 1,
                    align: "start",
                }
            }
        },
        [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
    );

    // Use custom hook for dot navigation
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);


    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-6">
                <div className="text-left mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 text-center md:text-left">{heading}</h2>
                    <p className='text-gray-600 md:text-lg text-center md:text-left'>{description}</p>
                </div>
                <div className='relative'>
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="grid gap-6 grid-flow-col auto-cols-[100%] md:auto-cols-[50%] lg:auto-cols-[25%]">
                            {testimonials && testimonials.length > 0 ? (
                                testimonials.map((testimonial, index) => (
                                    <div key={index} className={`h-full flex flex-col justify-between rounded-3xl ${index % 2 === 0 ? 'bg-[#C1F177]' : 'bg-[#D9F1FD]'}`}>
                                        <div className='relative'>
                                            {typeof testimonial.image !== 'number' && testimonial.image && (
                                                <div className="w-full md:h-64 h-80 overflow-hidden">
                                                    <Image
                                                        src={testimonial.image.url || ''}
                                                        alt={testimonial.name || 'Testimonial image'}
                                                        width={500}
                                                        height={500}
                                                        className="object-cover w-full h-full rounded-t-3xl"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                            <div className={`rounded-t-3xl p-3 -mt-4 absolute w-full ${index % 2 === 0 ? 'bg-[#C1F177]' : 'bg-[#D9F1FD]'}`}>

                                            </div>
                                            <div className='relative mt-3 px-3'>
                                                <Image
                                                    className="absolute -top-8 left-0 w-9 h-9"
                                                    src="/assets/icons/quote.png"
                                                    alt="Quote"
                                                    width={32}
                                                    height={32}
                                                    priority={false}
                                                />

                                                <p className="text-base md:text-sm text-gray-700 leading-relaxed my-6 text-justify">
                                                    {testimonial.review || ''}
                                                </p>
                                                <Image
                                                    className="absolute -right-0 -bottom-6 w-9 h-9"
                                                    src="/assets/icons/double-quotes.png"
                                                    alt="Quote"
                                                    width={35}
                                                    height={35}
                                                    priority={false}
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>

                                        <div className=" bg-white rounded-xl p-3 m-3 shadow-sm testimonial-info-card ">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-lg md:text-sm font-medium text-[#FF0000]">
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-base md:text-xs text-[#FF0000]">
                                                        {testimonial.course}
                                                    </p>
                                                </div>
                                                {typeof testimonial.universityImage !== 'number' && testimonial.universityImage && (
                                                    <Image
                                                        src={testimonial.universityImage.url || ''}
                                                        alt="University logo"
                                                        width={80}
                                                        height={50}
                                                        className="object-contain h-10 w-auto"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No testimonials available.</p>
                            )}
                        </div>

                        {/* Dot Indicators */}
                        <div className="flex justify-center gap-2 mt-4">
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
            </div>
        </section>
    );
};

export default TestimonialsBlock;