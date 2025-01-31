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
    } = props;

    return (
        <section className={cn('py-16', className)}>
            {/* Header Section */}
            <div className="container mx-auto px-4 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
                    <h2 className="text-2xl text-red-500 font-semibold mb-4">
                        {subtitle}
                    </h2>
                    <p className="text-gray-600 mb-12">{description}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4">
                <div className="bg-[#D3F584] rounded-xl p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* IELTS Logo and Hybrid Learning */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="font-bold text-2xl">IELTS</div>
                                {learningType && (
                                    <span className="text-lg">{learningType.title}</span>
                                )}
                            </div>

                            {learningType && (
                                <p className="text-gray-600">{learningType.subtitle}</p>
                            )}

                            {/* Study Modes */}
                            {studyModes && studyModes.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {studyModes.map((mode, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-white px-4 py-2 rounded-xl"
                                        >
                                            {mode.label}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Features List */}
                            {features && features.length > 0 && (
                                <ul className="space-y-3 list-disc pl-5">
                                    {features.map((feature, index) => (
                                        <li key={index} className="text-gray-700">
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* CTA Button */}
                            {ctaButton && (
                                <Button
                                    size="lg"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 rounded-3xl"
                                    asChild
                                >
                                    <a href={ctaButton.href}>{ctaButton.text}</a>
                                </Button>
                            )}
                        </div>

                        {/* Right Column - Image */}
                        {image && typeof image !== 'number' && 'url' in image && (
                            <div className="rounded-lg overflow-hidden bg-gray-100">
                                <div className="relative w-full h-[400px]">
                                    <Image
                                        src={image.url || ''}
                                        alt="IELTS Training"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IELTSBlock;