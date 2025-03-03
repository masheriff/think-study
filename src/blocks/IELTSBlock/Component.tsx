'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IELTSBlock as IELTSBlockType } from '@/payload-types';

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

    // Early return if required data is missing
    if (!title || !subtitle || !description) {
        return null;
    }

    return (
        <section className={cn('', className)}>
            {/* Header Section */}
            <div className="container mb-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-3xl text-red-500 font-kaushan font-normal mb-4">
                        {subtitle}
                    </h2>
                    <p className="text-gray-700 mx-auto text-center">
                        {description}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container">
                <div className="bg-[#D3F584] rounded-3xl overflow-hidden p-10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6 flex flex-col justify-center">
                            {/* IELTS Logo and Hybrid Learning */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    {ieltsText && (
                                        <div className="text-2xl font-bold mr-2">{ieltsText}</div>
                                    )}
                                    <div className="border-l border-gray-400 h-6 mx-2" />
                                    {ieltsImage && typeof ieltsImage !== 'number' && 'url' in ieltsImage && (
                                        <div className="relative w-16 h-8">
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
                                        <div className="text-sm text-gray-700">{learningType.subtitle}</div>
                                    </div>
                                )}
                            </div>

                            {/* Study Modes */}
                            {studyModes && studyModes.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {studyModes.map((mode, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-white text-gray-700 hover:bg-gray-100 rounded-full px-4 py-1 text-sm"
                                        >
                                            {mode.label}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Features List */}
                            {features && features.length > 0 && (
                                <ul className="space-y-3 text-gray-800">
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
                                <div className="flex">
                                    <Button
                                        size="lg"
                                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-2 mt-4"
                                        asChild
                                    >
                                        <a href={ctaButton.href}>{ctaButton.text}</a>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Image */}
                        {image && typeof image !== 'number' && 'url' in image && (
                            <div className="relative h-full min-h-[500px] w-full">
                                <Image
                                    src={image.url || ''}
                                    alt="IELTS Training"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="object-cover rounded-3xl"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IELTSBlock;