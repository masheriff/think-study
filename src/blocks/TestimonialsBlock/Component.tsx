import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'

type Props = TestimonialsBlockType & {
    className?: string
}

export const TestimonialsBlock: React.FC<Props> = (props) => {
    const { className, heading, description, testimonials } = props

    return (
        <section className={cn('py-16 bg-white', className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">{heading}</h2>
                    <RichText data={description} />
                </div>
                <div className="flex flex-row justify-between gap-8">
                    {testimonials && testimonials.length > 0 ? (
                        testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm flex flex-row w-1/2">
                                {/* Testimonial Image */}
                                {typeof testimonial.image !== 'number' && testimonial.image && (
                                    <div className="w-1/2 h-72">
                                        <Image
                                            src={testimonial.image.url || ''}
                                            alt={testimonial.name}
                                            width={256}
                                            height={256}
                                            className="rounded-xl object-cover w-full h-full"
                                        />
                                    </div>
                                )}
                                {/* Testimonial Content */}
                                <div className="w-1/2 ml-4 rounded-xl bg-lime-400 p-4 flex flex-col justify-between h-72">
                                    <p className="mb-4 font-medium text-[10px] max-h-[70%]">{testimonial.review}</p>
                                    <div className="flex justify-between items-center bg-white p-2 rounded-xl mt-auto">
                                        <div>
                                            <h3 className="text-xs text-red-500">{testimonial.name}</h3>
                                            <p className="text-xs text-red-500">{testimonial.course}</p>
                                        </div>
                                        {typeof testimonial.universityImage !== 'number' && testimonial.universityImage && (
                                            <Image
                                                src={testimonial.universityImage.url || ''}
                                                alt="University"
                                                width={80}
                                                height={50}
                                                className="rounded-full"
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
            </div>
        </section>
    )
}

export default TestimonialsBlock