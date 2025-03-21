'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IELTSBlock as IELTSBlockType } from '@/payload-types';
import TextHighlighter from '@/components/ui/texthighlighter';

type Props = IELTSBlockType & {
    className?: string;
};

export const IELTSBlock: React.FC<Props> = (props) => {
    const {
        className,
        title,
        subtitle,
        description,
        learningType,
        studyModes,
        features,
        ctaButton,
        image,
        ieltsText,
        ieltsImage,
    } = props;

    if (!title || !subtitle || !description) {
        return null;
    }

    return (
        <section className={cn('', className)}>
            {/* Header Section */}
            <div className="container px-6 md:px-12 mb-12">
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-3">{title}</h1>
                    <h2 className="text-4xl md:text-5xl text-[#FF0000] font-mynerve italic font-bold">
                        {subtitle}
                    </h2>
                    <p className="text-base text-gray-700">
                        {description}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-4 md:container md:mx-auto p-6 md:p-12 rounded-3xl bg-[#D3F584]">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="space-y-8 flex flex-col justify-center order-2 lg:order-none">
                        {/* IELTS Logo and Hybrid Learning */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                {ieltsText && (
                                    <div className="text-2xl font-bold">{ieltsText}</div>
                                )}
                                <div className="border-l border-gray-400 h-8 mx-3" />
                                {ieltsImage && typeof ieltsImage !== 'number' && 'url' in ieltsImage && (
                                    <div className="relative w-20 h-10">
                                        <Image
                                            src={ieltsImage.url || ''}
                                            alt="IELTS Logo"
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                )}
                            </div>
                            {learningType && (
                                <div>
                                    <div className="text-xl font-semibold">{learningType.title}</div>
                                    <div className="text-sm text-gray-700"><TextHighlighter text={learningType.subtitle} /></div>
                                </div>
                            )}
                        </div>

                        {/* Study Modes */}
                        {studyModes && studyModes.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {studyModes.map((mode, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-white text-gray-700 hover:bg-gray-100 rounded-full px-5 py-2 text-sm"
                                    >
                                        {mode.label}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Features List */}
                        {features && features.length > 0 && (
                            <ul className="space-y-4 text-lg text-gray-800">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* CTA Button */}
                        {ctaButton && (
                            <div>
                                <Button className="bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-6 py-3 rounded-3xl transition-colors">
                                    <a href={ctaButton.href}>{ctaButton.text}</a>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Image */}
                    {image && typeof image !== 'number' && 'url' in image && (
                        <div className="relative h-full min-h-[500px] w-full rounded-3xl overflow-hidden shadow-lg order-1 lg:order-none">
                            <Image
                                src={image.url || ''}
                                alt="IELTS Training"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default IELTSBlock;
