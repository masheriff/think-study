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
            <div className="flex flex-col p-6 py-16 bg-[#D9F1FD] rounded-3xl space-x-6 md:space-y-10">
                {/* Main Titles */}
                <h2 className="text-2xl sm:text-4xl text-center font-mynerve font-bold mb-2 sm:mb-0 text-[#FF0000]">{mainTitle}</h2>
                <p className="text-xl sm:text-3xl text-center font-bold text-black">{subTitle}</p>


                {/* Content Section */}
                <div className="flex flex-col w-[90%] sm:w-[88%] mx-auto md:flex-row justify-between items-center text-center sm:text-start my-8">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 pr-0 md:pr-[0rem] md:mb-0">
                        <p className="text-xl sm:text-2xl italic text-[#F00000]">
                            {leftContent?.headline}
                        </p>
                        <p className="text-xl sm:text-2xl text-[#FF0000] mt-2">
                            <span className='font-bold'>{leftContent?.highlight}</span>&nbsp;{leftContent?.subheadline}
                        </p>
                    </div>

                    {/* Center Bracket - now visible on mobile but rotated */}
                    <div className="flex items-center justify-center">
                        <div className="text-9xl md:text-8xl lg:text-9xl font-normal text-black transform rotate-90 md:rotate-0">{`{`}</div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 pl-0 md:pl-[2.5rem]">
                        <ul className="space-y-1 sm:space-y-2">
                            {rightContent?.services?.map((service, index) => (
                                <li key={index} className="text-xl sm:text-2xl font-normal">
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