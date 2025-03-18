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
            <div className="flex flex-col items-center justify-center h-[600px] w-full p-6 py-16 bg-[#D9F1FD] rounded-3xl">
                {/* EN Speech Bubble SVG */}


                {/* Main Content */}
                <div className="flex flex-col items-center justify-center relative">
                    <div className="absolute -top-20 right-5">
                        <Image
                            src="/assets/images/en-bubble.svg"
                            alt="EN Speech Bubble"
                            width={150}
                            height={150}
                            priority
                            className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
                        />
                    </div>
                    {/* Title with IELTS emphasized */}
                    <h2 className='text-center mb-8 hidden md:block'>
                        <span className="text-3xl font-semibold">{titlePrefix} </span>
                        <span className="text-7xl md:text-9xl font-black"><sub>{titleEmphasis}</sub></span>
                        <span className="text-3xl font-semibold"> {titleSuffix}</span>
                    </h2>
                    <div className='flex flex-col justify-between space-y-2 md:hidden'>
                        <h2 className="text-3xl font-semibold leading-none">{titlePrefix} </h2>
                        <h2 className="text-8xl font-black leading-none">{titleEmphasis}</h2>
                        <h2 className="text-3xl font-semibold leading-none"> {titleSuffix}</h2>
                    </div>


                    {/* Enroll Button */}
                    <button
                        className="px-12 py-2 rounded-full bg-[#C1F177] text-black hover:bg-[#b9f165] transition-colors mt-4"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
};