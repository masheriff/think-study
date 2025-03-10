'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';


export type BenefitsInStudyType = {
    className?: string;
    backgroundImage: {
        url: string;
        alt: string;
        width: number;
        height: number;
    };
    benefitsDescription: string;
};


export const BenefitsInStudy: React.FC<BenefitsInStudyType> = (props) => {
    const {
        backgroundImage,
        benefitsDescription,
        className,
    } = props

    return (
        <section className={cn("container", className)}>

            <div className="rounded-3xl mx-auto bg-[#D9F1FD] sm:p-6 p-4 border border-dashed border-gray-300">
                <div className="flex justify-center">
                    {backgroundImage?.url && (
                        <Image
                            src={backgroundImage.url}
                            alt={backgroundImage.alt || 'Study benefits background'}
                            width={backgroundImage.width}
                            height={backgroundImage.height}
                            className="rounded-3xl w-full sm:max-h-[400px]object-cover"
                            priority
                        />
                    )}
                </div>
                <div className="text-center mt-[32px] px-16">
                    <p className="sm:text-[21px] text-[14px] font-roboto font-normal leading-7 text-justify">
                        {benefitsDescription}
                    </p>
                </div>

            </div>

        </section>
    );
};