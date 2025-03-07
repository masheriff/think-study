"use client";

import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'
import useEmblaCarousel from "embla-carousel-react";

type Props = TestimonialsBlockType & {
    className?: string
}

export const TestimonialsBlock: React.FC<Props> = (props) => {
    const [emblaRef] = useEmblaCarousel({
        align: "center",
        skipSnaps: false,
        dragFree: false,
        containScroll: "keepSnaps",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": {
                align: "center",
                slidesToScroll: 1
            }
        }
    });

    const { className, heading, description, testimonials } = props

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-10">
                <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">{heading}</h2>
                    <p className='text-gray-600 md:text-lg'>{description}</p>
                </div>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-8 my-10">
                        {testimonials && testimonials.length > 0 ? (
                            testimonials.map((testimonial, index) => (
                                <div key={index} className='flex flex-row gap-4 md:flex-[0_0_calc(50%-21.333px)] flex-[0_0_100%]'>
                                    {typeof testimonial.image !== 'number' && testimonial.image && (
                                        <div className="w-full md:w-1/2 flex flex-col rounded-3xl overflow-hidden shadow-lg">
                                            <Image
                                                src={testimonial.image.url || ''}
                                                alt={testimonial.name}
                                                width={500}  //Adjust these values as needed
                                                height={500} //Adjust these values as needed
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    )}
                                    <div className="w-full md:w-1/2 bg-[#C1F177] p-6 flex flex-col justify-between rounded-3xl overflow-hidden shadow-lg">
                                        <div className="relative mt-4 mb-4">
                                            <Image className="absolute top-[-20px] left-[-10px]" src="/media/icons/quote.png" alt="Quote" width={35} height={35} />
                                            <p className="text-xs text-gray-700 leading-relaxed mt-4 mb-4 text-justify px-4">
                                                {testimonial.review}
                                            </p>
                                            <Image className="absolute bottom-[-15px] right-2" src="/media/icons/double-quotes.png" alt='Quote' width={35} height={35} />
                                        </div>
                                        <div className="mt-4 bg-white rounded-xl p-3 shadow-sm">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-sm font-medium text-[#FF0000]">
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-xs text-[#FF0000]">
                                                        {testimonial.course}
                                                    </p>
                                                </div>
                                                {typeof testimonial.universityImage !== 'number' && testimonial.universityImage && (
                                                    <Image
                                                        src={testimonial.universityImage.url || ''}
                                                        alt="University"
                                                        width={80}  //Adjust these values as needed
                                                        height={50} //Adjust these values as needed
                                                        className="object-contain w-24"
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
    )
}

export default TestimonialsBlock