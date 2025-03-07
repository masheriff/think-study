'use client'

import React from 'react';
import type { IELTSEnroll as IELTSEnrollType } from '@/payload-types';
import { cn } from '@/utilities/ui';
import Image from 'next/image';

type Props = IELTSEnrollType & {
    className?: string;
};

export const IELTSEnroll: React.FC<Props> = ({
    titlePrefix,
    titleEmphasis,
    titleSuffix,
    buttonText,
    className,
}) => {
    return (
        <section className={cn('container', className)}>
            <div className="flex flex-col items-center justify-center h-[600px] w-full p-6 py-16 bg-[#D9F1FD] rounded-3xl relative">
                {/* EN Speech Bubble SVG */}
                <div className="absolute top-20 right-[420px]">
                    <Image
                        src="/assets/images/en-bubble.svg"
                        alt="EN Speech Bubble"
                        width={150}
                        height={150}
                        priority
                    />
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-center justify-center">
                    {/* Title with IELTS emphasized */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            <span className="text-3xl font-semibold">{titlePrefix} </span>
                            <span className="text-7xl md:text-9xl font-black"><sub>{titleEmphasis}</sub></span>
                            <span className="text-3xl font-semibold"> {titleSuffix}</span>
                        </h2>
                    </div>

                    {/* Enroll Button */}
                    <button
                        className="px-14 py-1 bg-[#C1F177] text-black rounded-full hover:bg-[#b9f165] transition-colors"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
};