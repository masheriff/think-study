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
            <div className="rounded-3xl mx-auto bg-[#D9F1FD] sm:p-6 p-4 flex flex-col-reverse md:flex-col space-y-">
                <div className='relative h-[500px] flex'>
                    {backgroundImage?.url && (
                        <Image
                            src={backgroundImage.url}
                            alt={backgroundImage.alt || 'Study benefits background'}
                            fill
                            className="rounded-3xl object-cover"
                            priority
                        />
                    )}
                </div>
                <p className="text-xl text-center m-4 md:mb-0">
                    {benefitsDescription}
                </p>
            </div>

        </section>
    );
};