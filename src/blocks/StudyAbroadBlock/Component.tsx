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
    backgroundColor: string; // Add this prop
};

export const StudyAbroadBlock: React.FC<Props> = (props) => {
    const {
        className,
        heading,
        subheading,
        description,
        title,
        titleDescription,
        cards,
        backgroundColor, // Extract background color
    } = props;

    // Define background color classes
    const backgroundColorClass = backgroundColor === 'blue' ? 'bg-[#D9F1FD]' : 'bg-white';

    return (
        <section className={cn("container py-20 px-6 md:px-12 rounded-3xl", backgroundColorClass, className)}>
            {/* Header Section */}
            <div className="text-center max-w-5xl mx-auto space-y-8">
                <h2 className="text-2xl md:text-3xl">{heading}</h2>
                <h1 className="text-4xl md:text-5xl font-semibold">{subheading}</h1>
                <p className="text-base"><TextHighlighter text={description} /></p>
            </div>

            {/* "Our Pathway" Section */}
            {title && (
                <div className="text-center max-w-5xl mx-auto pb-16 pt-12">
                    <h3 className="text-4xl md:text-5xl text-[#FF0000] font-bold pb-6 font-mynerve italic">{title.content}</h3>
                    <p className="text-black/80 italic">{titleDescription}</p>
                </div>
            )}

            {/* Cards Section */}
            {cards?.map((card, index) => {
                const imageData = card.image && typeof card.image === 'object' ? card.image as Media : null;

                return (
                    <div
                        key={index}
                        className={`max-w-6xl mx-auto flex flex-col gap-12 mb-12 items-center ${card.imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* Content Side */}
                        <div className={`w-full md:w-3/5 space-y-6 flex items-start ${card.imagePosition === "right" ? "justify-start" : "justify-end"
                            }`}>
                            <div className="text-8xl font-bold text-black mt-4">
                                {index + 1}
                            </div>
                            <div className="space-y-6 px-4 md:px-6">
                                <h2 className="text-2xl md:text-3xl"><TextHighlighter text={card.courseDescription} /></h2>
                                <p className="text-gray-600 text-base">{card.description}</p>
                                <Button className="bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-6 py-3 rounded-3xl transition-colors" asChild>
                                    <a href={card.buttonLink}>{card.buttonText}</a>
                                </Button>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className={`w-full md:w-2/5 rounded-3xl overflow-hidden flex ${card.imagePosition === "left" ? "justify-start" : "justify-end"
                            }`}>
                            <Image
                                src={imageData?.url || '/placeholder.svg'}
                                alt={imageData?.alt || ''}
                                width={320}
                                height={320}
                                className="rounded-3xl shadow-lg"
                            />
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default StudyAbroadBlock;
