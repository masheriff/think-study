import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'

type Props = TestimonialsBlockType & {
    className?: string
}

export const TestimonialsBlock: React.FC<Props> = (props) => {
    const { className, heading, description, testimonials } = props

    return (
        <section className={cn('py-8 md:py-16 bg-white', className)}>
            <div className="container">
                <div className="mb-8 md:mb-12 text-left">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{heading}</h2>
                    <p className='text-left'>{description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-1">
                    {testimonials && testimonials.length > 0 ? (
                        testimonials.map((testimonial, index) => (
                            <div key={index} className="flex flex-col md:flex-row shadow-sm md:shadow-none p-2 gap-4 md:gap-6">
                                {/* Testimonial Image */}
                                {typeof testimonial.image !== 'number' && testimonial.image && (
                                    <div className="w-full md:w-1/2 aspect-square rounded-2xl">
                                        <Image
                                            src={testimonial.image.url || ''}
                                            alt={testimonial.name}
                                            width={200} // Reduced width
                                            height={200} // Reduced height
                                            className="object-cover w-full h-full rounded-2xl"
                                        />
                                    </div>
                                )}
                                {/* Testimonial Content */}
                                <div className="w-full md:w-1/2 bg-lime-300 p-4 md:p-5 flex flex-col justify-between rounded-2xl aspect-square">
                                    <div className="relative">
                                        <Image className="absolute -top-4 left-0" src="/media/icons/quote.png" alt="Quote" width={20} height={20} /> {/* Reduced icon size */}
                                        <p className="text-xs text-gray-700 leading-relaxed mt-4 px-4"> {/* Reduced text size and padding */}
                                            {testimonial.review}
                                        </p>
                                        <Image className="absolute bottom-0 right-0" src="/media/icons/double-quotes.png" alt='Quote' width={20} height={20} /> {/* Reduced icon size */}
                                    </div>
                                    <div className="mt-4 bg-white rounded-lg p-2 shadow-sm"> {/* Reduced margin and padding */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-xs font-medium text-red-500">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-xs text-red-500">
                                                    {testimonial.course}
                                                </p>
                                            </div>
                                            {typeof testimonial.universityImage !== 'number' && testimonial.universityImage && (
                                                <Image
                                                    src={testimonial.universityImage.url || ''}
                                                    alt="University"
                                                    width={40} // Reduced width
                                                    height={25} // Reduced height
                                                    className="object-contain w-24" // Adjusted width
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
        </section>
    )
}

export default TestimonialsBlock