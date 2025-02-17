'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import type { FAQBlock as FAQBlockType } from '@/payload-types'
import { Plus, Minus } from 'lucide-react'
import AOS from 'aos';
import 'aos/dist/aos.css';

type Props = FAQBlockType & {
    className?: string
}

type FAQItem = {
    question: string
    answer: string
    id?: string | null
}

export const FAQBlock: React.FC<Props> = (props) => {
    const { className, title, faqs, styles } = props
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className={cn(' max-w-6xl py-12 px-4 md:px-6 mx-auto', className)}>
            <h2
                className="text-center mb-12"
                style={{
                    fontSize: styles?.titleStyles?.fontSize || '48px',
                    fontWeight: styles?.titleStyles?.fontWeight || 'bold',
                    textAlign: styles?.titleStyles?.textAlign || 'center',
                }}
            >
                {title}
            </h2>

            <div data-aos="fade-right" className="space-y-4 scroll-smooth snap-start scroll-ml-6 overflow-y-scroll h-[400px]">
                {faqs?.map((faq: FAQItem, index: number) => (
                    <div
                        key={faq.id || index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                            style={{
                                fontSize: styles?.quesStyles?.fontSize || '18px',
                                fontWeight: styles?.quesStyles?.fontWeight || 'medium',
                            }}
                        >
                            <span>{faq.question}</span>
                            {openIndex === index ? (
                                <Minus className="flex-shrink-0 h-5 w-5 text-gray-500" />
                            ) : (
                                <Plus className="flex-shrink-0 h-5 w-5 text-gray-500" />
                            )}
                        </button>

                        {openIndex === index && (
                            <div
                                className="p-4 bg-gray-50"
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

        </section>
    )
}

export default FAQBlock