'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { UniversitiesBlock as UniversitiesBlockType } from '@/payload-types';

type Props = UniversitiesBlockType & {
    className?: string;
};

export const UniversitiesBlock: React.FC<Props> = (props) => {
    const {
        className,
        mainHeading,
        subHeading,
        description,
        stats,
        universitiesImage,
    } = props;

    return (
        <section className={cn('py-16', className)}>
            {/* Hero Section */}
            <div className="container mx-auto px-4 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{mainHeading}</h1>
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-4">
                        {subHeading}
                    </h2>
                    <p className="text-gray-600 mb-12">{description}</p>

                    {/* Statistics */}
                    {stats && stats.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-xl md:text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* University Image */}
            {universitiesImage && typeof universitiesImage !== 'number' && 'url' in universitiesImage && (
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center">
                        <div className="w-full h-[300px] relative">
                            <Image
                                src={universitiesImage.url || ''}
                                alt="University Logo"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </div>
            )}
            <hr className="mt-32 w-96 mx-auto" />
        </section>

    );
};

export default UniversitiesBlock;
