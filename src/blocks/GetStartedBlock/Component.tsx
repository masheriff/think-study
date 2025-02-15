'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { GetStartedBlock as GetStartedBlockType } from '@/payload-types';

type Props = GetStartedBlockType & {
    className?: string;
};

export const GetStartedBlock: React.FC<Props> = (props) => {
    const {
        className,
        heading,
        title,
        features,
        footerText,
        image,
    } = props;

    return (
        <section className={cn('', className)}>
            <div className="container">
                <div className="bg-blue-50 flex flex-col md:flex-row items-center justify-between p-10 rounded-3xl">
                    {/* Left Content */}
                    <div className="flex-1 mb-8 md:mb-0">
                        {heading && (
                            <h3 className="text-lg font-medium text-gray-800 mb-2">
                                {heading}
                            </h3>
                        )}

                        {title && (
                            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
                                {title.split(' ').map((word, index) => (
                                    <React.Fragment key={index}>
                                        {word}
                                        {index < title.split(' ').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                                <span className="inline-block ml-2">🌎✨</span>
                            </h2>
                        )}

                        {/* Features List */}
                        {features && features.length > 0 && (
                            <ul className="space-y-4 list-none pl-0">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none" className="mr-3 mt-1.5">
                                            <path d="M18 11L0 21.3923V0.607696L18 11Z" fill="#FF0000" />
                                        </svg>
                                        <p className="text-gray-700 leading-relaxed">
                                            {feature.text}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Footer Text */}
                        {/* {footerText && (
                            <p className="mt-6 text-gray-600">
                                {footerText}
                            </p>
                        )} */}
                    </div>

                    {/* Right Image */}
                    <div className="flex-1">
                        {image && typeof image !== 'number' && 'url' in image && (
                            <div className="relative h-[400px] md:h-[500px] w-full bg-slate-200 rounded-xl">
                                <Image
                                    src={image.url || ''}
                                    alt="Graduate student"
                                    fill
                                    priority
                                    style={{ objectFit: 'contain' }}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetStartedBlock;