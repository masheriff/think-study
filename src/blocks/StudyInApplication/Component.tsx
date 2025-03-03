
'use client'

import React from 'react';
import type { StudyInApplication as StudyInApplicationType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type Props = StudyInApplicationType & {
    className?: string;
};

export const StudyInApplication: React.FC<Props> = ({
    mainTitle,
    subTitle,
    leftContent,
    rightContent,
    className,
    // highlight,
}) => {
    return (
        <section className={cn('container', className)}>
            <div className="flex flex-col p-6 py-16 bg-[#D9F1FD] rounded-3xl">
                {/* Main Titles */}
                <div className="mb-12 text-center">
                    <h2 className="text-[36px] font-bold text-[#FF0000]">{mainTitle}</h2>
                    <p className="text-[28px] font-bold text-black">{subTitle}</p>
                </div>

                {/* Content Section */}
                <div className="flex flex-col w-[80%] mx-auto md:flex-row justify-between items-center my-8">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
                        <p className="text-[24px] text-[#FF0000] font-medium">
                            {leftContent?.headline}
                        </p>
                        <p className="text-[24px] text-[#FF0000] font-medium mt-2">
                            <span className='font-bold'>{leftContent?.highlight}</span>&nbsp;{leftContent?.subheadline}
                        </p>
                    </div>

                    {/* Center Bracket */}
                    <div className="hidden md:flex items-center justify-center mx-4">
                        <div className="text-[120px] font-light text-black">{`{`}</div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 pl-0 md:pl-8">
                        <ul className="space-y-2">
                            {rightContent?.services?.map((service, index) => (
                                <li key={index} className="text-[24px] font-medium">
                                    {service.serviceText}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};