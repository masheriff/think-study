
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
                    <h2 className="sm:text-[50px]  font-caveat text-[26px] font-bold mb-2 sm:mb-0 text-[#FF0000]">{mainTitle}</h2>
                    <p className="sm:text-[28px] text-[20px] font-roboto font-bold text-black">{subTitle}</p>
                </div>

                {/* Content Section */}
                <div className="flex flex-col w-[90%]  sm:w-[81%] mx-auto md:flex-row justify-between items-center text-center sm:text-start my-8">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2  pr-0 md:pr-10 mb-8 md:mb-0">
                        <p className="sm:text-[24px] text-[20px] font-roboto italic  text-[#F00000] font-medium">
                            {leftContent?.headline}
                        </p>
                        <p className="sm:text-[24px] text-[20px]  text-[#FF0000] font-medium mt-2">
                            <span className='font-bold'>{leftContent?.highlight}</span>&nbsp;{leftContent?.subheadline}
                        </p>
                    </div>

                    {/* Center Bracket */}
                    <div className="hidden md:flex items-center justify-center mx-4">
                        <div className="text-[150px] font-normal text-black">{`{`}</div>
                    </div>

                    {/* Right Section */}

                    <div className="w-full md:w-1/2 pl-0  md:pl-8">
                        <ul className="sm:space-y-2 space-y-1">
                            {rightContent?.services?.map((service, index) => (
                                <li key={index} className="sm:text-[22px] text-[20px] font-normal">
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