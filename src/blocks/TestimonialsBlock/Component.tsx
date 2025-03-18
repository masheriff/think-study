"use client";

import React, { useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types';
import useEmblaCarousel from "embla-carousel-react";

type Props = TestimonialsBlockType & {
    className?: string
}

export const TestimonialsBlock: React.FC<Props> = (props) => {
    const { className, heading, description, testimonials } = props;

    // Updated carousel configuration
    const [emblaRef] = useEmblaCarousel({
        align: "center",
        skipSnaps: false,
        dragFree: false,
        containScroll: "keepSnaps",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": { // Tablet and above
                align: "center",
                slidesToScroll: 1
            }
        }
    });

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-6">
                <div className="text-left mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 text-center md:text-left">{heading}</h2>
                    <p className='text-gray-600 md:text-lg  text-center md:text-left'>{description}</p>
                </div>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-8 my-10">
                        {testimonials && testimonials.length > 0 ? (
                            testimonials.map((testimonial, index) => (
                                <div key={index} className='flex flex-col md:flex-row gap-4 md:flex-[0_0_100%] lg:flex-[0_0_calc(50%-21.333px)] flex-[0_0_100%]'>
                                    {typeof testimonial.image !== 'number' && testimonial.image && (
                                        <div className="w-full md:w-1/2 h-96 lg:h-auto flex flex-col rounded-3xl overflow-hidden shadow-lg">
                                            <Image
                                                src={testimonial.image.url || ''}
                                                alt={testimonial.name || 'Testimonial image'}
                                                width={500}
                                                height={500}
                                                className="object-cover w-full h-full"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div className="w-full md:w-1/2 bg-[#C1F177] p-6 flex flex-col justify-between rounded-3xl overflow-hidden shadow-lg">
                                        <div className="relative">

                                            <Image
                                                className="absolute -top-4 -left-5 md:-left-3 md:-top-3 w-16 h-16 sm:w-12 sm:h-12 md:w-9 md:h-9"
                                                src="/media/icons/quote.png"
                                                alt="Quote"
                                                width={32}
                                                height={32}
                                                priority={false}
                                            />

                                            <p className="text-base md:text-xs text-gray-700 leading-relaxed my-8 md:my-6 text-justify">
                                                {testimonial.review}
                                            </p>
                                            <Image
                                                className="absolute -right-4 -bottom-4 md:-right-3 md:-bottom-2 w-16 h-16 sm:w-12 sm:h-12 md:w-9 md:h-9"
                                                src="/media/icons/double-quotes.png"
                                                alt="Quote"
                                                width={35}
                                                height={35}
                                                priority={false}
                                            />
                                        </div>
                                        <div className="mt-4 bg-white rounded-xl p-3 shadow-sm">
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
                                                        className="object-contain w-36 md:w-24"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No testimonials available.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsBlock;