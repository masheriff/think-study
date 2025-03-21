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
        <section className="mx-4 md:container md:mx-auto  p-6 md:p-12 rounded-3xl bg-[#D9F1FD]">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-6 flex flex-col justify-center order-2 lg:order-none">
                    {heading && (
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            {heading}
                        </h3>
                    )}

                    {title && (
                        <h2 className="text-3xl w-full md:text-4xl font-medium text-gray-900 mb-6">
                            {title}
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
                {/* Right Column - Image */}
                {image && typeof image !== 'number' && 'url' in image && (
                    <div className="relative h-full min-h-[500px] md:min-h-[700px] border border-white/50 w-full rounded-3xl overflow-hidden order-1 lg:order-none bg-slate-200">
                        <Image
                            src={image.url || ''}
                            alt="Graduate student"
                            fill
                            priority
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default GetStartedBlock;