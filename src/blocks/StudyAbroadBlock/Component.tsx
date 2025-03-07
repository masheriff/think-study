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
        <section className={cn("container", className)}>
            {/* Header Section */}
            <div className="text-center w-3/4 mx-auto space-y-6">
                <h2 className="text-2xl md:text-3xl">{heading}</h2>
                <h1 className="text-4xl md:text-5xl font-semibold">{subheading}</h1>
                <p className="text-gray-600"><TextHighlighter text={description} /></p>
            </div>

            {/* "Our Pathway" Section */}
            {title && (
                <div className="text-center w-3/4 mx-auto space-y-6 my-16">
                    <h3 className="text-4xl text-[#E63E30] font-bold mb-4 font-fuzzyBubbles">{title.content}</h3>
                    <p className="text-gray-600 italic">{titleDescription}</p>
                </div>
            )}

            {/* Cards Section */}
            {cards?.map((card, index) => {
                // Type guard to check if image is Media type
                const imageData = card.image && typeof card.image === 'object'
                    ? card.image as Media
                    : null;

                return (
                    <div
                        key={index}
                        className={`max-w-6xl mx-auto flex flex-col gap-8 mb-8 items-center ${card.imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* Content Side */}
                        <div className={`w-full md:w-3/5 space-y-6 space-x-4 flex items-start ${card.imagePosition === "right" ? "justify-start" : "justify-end"
                            }`}>
                            {/* Number Placeholder */}
                            <div className="text-9xl font-bold text-black mt-4">
                                {index + 1}
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl md:text-3xl"><TextHighlighter text={card.courseDescription} /></h2>
                                <p className="text-gray-600 text-sm">{card.description}</p>
                                <Button
                                    className="bg-[#6B5BA9] hover:bg-[#574A8C] text-white px-6 py-2 rounded-3xl"
                                    asChild
                                >
                                    <a href={card.buttonLink}>{card.buttonText}</a>
                                </Button>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className={`w-full md:w-2/5 rounded-3xl overflow-hidden flex ${card.imagePosition === "left" ? "justify-start" : "justify-end"}`}>
                            <Image
                                src={imageData?.url || '/placeholder.svg'}
                                alt={imageData?.alt || ''}
                                width={300}
                                height={300}
                                className="rounded-3xl"
                            />
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default StudyAbroadBlock;