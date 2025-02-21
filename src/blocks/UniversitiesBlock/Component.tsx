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
        universitiesImages,
    } = props;

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-10">
                <div className="text-left md:w-3/4 w-full">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">{mainHeading}</h2>
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-3">
                        {subHeading}
                    </h2>
                    <p className='text-gray-600 md:text-lg mb-3'>{description}</p>
                    {/* Statistics */}
                    {stats && stats.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="text-sm md:text-sm font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* University Images */}
                {universitiesImages && universitiesImages.length > 0 && (

                    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-4 mt-16"> {/* 12 columns with small gap */}
                        {universitiesImages.map((universityImage, index) => (
                            typeof universityImage.image !== 'number' && 'url' in universityImage.image && (
                                <div key={index} className="flex justify-center items-center p-4 bg-gray-100 rounded-xl">
                                    <div className="w-full h-[50px] relative  ">
                                        <Image
                                            src={universityImage.image.url || ''}
                                            alt="University Logo"
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
                <hr className="mt-32 w-96 mx-auto" />
            </div>
        </section>

    );
};

export default UniversitiesBlock;