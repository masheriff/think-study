'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { StudyAbroadBlock as StudyAbroadBlockType } from '@/payload-types';
import { Media } from '@/payload-types';
import { cn } from '@/utilities/ui';
import TextHighlighter from '@/components/ui/texthighlighter';

type Props = StudyAbroadBlockType & {
    className?: string;
    heading: {
        text: string;
        font: string;
    };
};

export const StudyAbroadBlock: React.FC<Props> = (props) => {
    const {
        className,
        heading,
        subheading,
        description,
        title,
        titleDescription,
        cards
    } = props;

    return (
        <section className={cn("py-16 px-4 md:px-8 max-w-7xl mx-auto", className)}>
            {/* Header Section */}
            <div className="text-center mb-16 space-y-6">
                <h2 className="text-2xl md:text-3xl">{heading}</h2>
                <h1 className="text-4xl md:text-5xl font-semibold">{subheading}</h1>
                <p className="text-gray-600 max-w-3xl mx-auto"><TextHighlighter text={description} /></p>
            </div>

            {/* "Our Pathway" Section */}
            {title && (
                <div className="text-center mt-12">
                    <h3 className="text-4xl text-[#E63E30] font-bold mb-4">{title.content}</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">{titleDescription}</p>
                </div>
            )}

            {/* Cards Section */}
            <div className="space-y-24">
                {cards?.map((card, index) => {
                    // Type guard to check if image is Media type
                    const imageData = card.image && typeof card.image === 'object'
                        ? card.image as Media
                        : null;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col gap-8 items-center ${card.imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Content Side */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="flex items-start space-x-4">
                                    {/* Number Placeholder */}
                                    <div className="text-9xl font-bold text-gray-800 leading-none">
                                        {index + 1}
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-gray-600 text-lg"><TextHighlighter text={card.courseDescription} /></p>
                                        <p className="text-gray-600 text-sm">{card.description}</p>
                                        <Button
                                            className="bg-[#6B5BA9] hover:bg-[#574A8C] text-white px-6 py-2 rounded-3xl"
                                            asChild
                                        >
                                            <a href={card.buttonLink}>{card.buttonText}</a>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="w-full md:w-1/2 rounded-3xl overflow-hidden">
                                <Image
                                    src={imageData?.url || '/placeholder.svg'}
                                    alt={imageData?.alt || ''}
                                    width={500}
                                    height={500}
                                    style={{ width: '100%', height: 'auto' }}  // Make image responsive
                                    className="rounded-3xl"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default StudyAbroadBlock;