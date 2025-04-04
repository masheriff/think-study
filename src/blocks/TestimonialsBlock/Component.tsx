"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types';
import useEmblaCarousel from "embla-carousel-react";

type Props = TestimonialsBlockType & {
    className?: string
}

export const TestimonialsBlock: React.FC<Props> = (props) => {
    const { className, heading, description, testimonials } = props;

    // Updated carousel configuration for 4-2-1 items display
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        skipSnaps: false,
        dragFree: true,
        containScroll: "keepSnaps",
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
    });

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-6">
                <div className="text-left mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 text-center md:text-left">{heading}</h2>
                    <p className='text-gray-600 md:text-lg text-center md:text-left'>{description}</p>
                </div>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-6 my-10">
                        {testimonials && testimonials.length > 0 ? (
                            testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)] rounded-3xl overflow-hidden'
                                >
                                    {typeof testimonial.image !== 'number' && testimonial.image && (
                                        <div className="w-full md:h-64 h-80 overflow-hidden">
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
                                    <div
                                        className={`w-full p-6 flex flex-col justify-between rounded-3xl -mt-5 min-h-[300px] ${index % 2 === 0 ? 'bg-[#C1F177]' : 'bg-[#D9F1FD]'}`}
                                    >
                                        <div className="relative">
                                            <Image
                                                className="absolute -top-4 -left-3 w-9 h-9"
                                                src="/assets/icons/quote.png"
                                                alt="Quote"
                                                width={32}
                                                height={32}
                                                priority={false}
                                            />

                                            <p className="text-base md:text-sm text-gray-700 leading-relaxed my-6 text-justify min-h-[120px]">
                                                {testimonial.review || ''}
                                            </p>
                                            <Image
                                                className="absolute -right-3 -bottom-2 w-9 h-9"
                                                src="/assets/icons/double-quotes.png"
                                                alt="Quote"
                                                width={35}
                                                height={35}
                                                priority={false}
                                                loading="lazy"
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
                                                        className="object-contain h-10 w-auto"
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