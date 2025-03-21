'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockType, Media } from '@/payload-types'
import { Plus, Minus } from 'lucide-react'
import Image from 'next/image'

type Props = FAQBlockType & {
    className?: string
}

type FAQItem = {
    question: string
    answer: string
    id?: string | null
}

export const FAQBlock: React.FC<Props> = (props) => {
    const { title, faqs, bottomImage } = props
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="container">
            <div className="bg-[#D9F1FD] rounded-3xl flex flex-col  overflow-hidden">
                <div className='p-8 md:px-12'>
                    <h2 className="text-center text-5xl mb-12"> {title} </h2>
                    <div className={`space-y-4 snap-start scroll-ml-6  ${faqs?.length > 5 ? "h-[360px] pr-8 overflow-y-scroll scroll-smooth" : "overflow-visible"
                        }`}>
                        {faqs?.map((faq: FAQItem, index: number) => (
                            <div
                                key={faq.id || index}
                                className="border border-black/20 overflow-hidden rounded-xl"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-4 text-left font-medium"
                                // style={{
                                //     fontSize: styles?.quesStyles?.fontSize || '18px',
                                //     fontWeight: styles?.quesStyles?.fontWeight || 'medium',
                                // }}
                                >
                                    <span>{faq.question}</span>
                                    {openIndex === index ? (
                                        <Minus className="flex-shrink-0 h-5 w-5 font-bold text-gray-500" />
                                    ) : (
                                        <Plus className="flex-shrink-0 h-5 w-5  font-bold text-gray-500" />
                                    )}
                                </button>

                                {openIndex === index && (
                                    <div
                                        className="p-4"
                                        style={{
                                            fontSize: '16px',
                                            lineHeight: '1.6',
                                        }}
                                    >
                                        <p className="text-gray-700">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>

                </div>
                <div className="h-52 relative">
                    {bottomImage && (
                        <Image
                            src={(bottomImage as Media).url || ''}
                            alt="Bottom FAQ Image"
                            fill
                            className="object-cover object-left"
                            priority
                        />
                    )}
                </div>
            </div>

        </section>
    )
}

export default FAQBlock