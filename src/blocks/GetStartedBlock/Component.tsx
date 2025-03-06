'use client';

import React from 'react';
import Image from 'next/image';
import type { GetStartedBlock as GetStartedBlockType } from '@/payload-types';
import { Triangle } from '@/components/thinkstudy-svg';

type Props = GetStartedBlockType & {
    className?: string;
};

export const GetStartedBlock: React.FC<Props> = (props) => {
    const {
        heading,
        title,
        features,
        image,
    } = props;

    return (
        <section className="container bg-[#D9F1FD] flex flex-col md:flex-row items-center justify-between p-10 rounded-3xl w-full">
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
                                <Triangle />
                                <p className="font-normal leading-tight ml-1 text-lg">
                                    {feature.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}

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
        </section>
    );
};

export default GetStartedBlock;