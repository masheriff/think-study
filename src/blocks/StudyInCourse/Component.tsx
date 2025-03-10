'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { StudyInCourse as StudyInCourseType } from '@/payload-types';


type Props = StudyInCourseType & {
    className?: string;
};

export const StudyInCourse: React.FC<Props> = (props) => {
    const {
        className,
        title,
        country,
        image,
    } = props;

    return (
        <section className={cn('container ', className)} >
            <div className="flex bg-[#D9F1FD] rounded-3xl flex-col md:flex-row items-center overflow-hidden">
                {/* Left Text (80%) */}
                <div className="md:w-4/5 p-6 study-in-header flex flex-col leading-tight  justify-center items-center md:items-center h-full">
                    <h2 className="text-[32px] font-roboto md:text-[45px] lg:text-[65px] text-[#000000] leading-none font-semibold mb-2 sm:mb-0">
                        {title}
                    </h2>
                    <p className="lg:text-[156px] md:text-[80px] text-[65px] text-[#000000] font-montserrat font-bold leading-none">
                        {country}
                    </p>
                </div>

                {/* Right Image (40%) */}
                <div className="relative">
                    <div className="absolute z-0 top-[12px] lg:ms-[68px] xl:ms-[88px] md:ms-[63px] ms-[37px] left-0 bottom-0 w-[80%] mx-auto h-[96.5%] bg-[#C1F177] rounded-3xl">
                    </div>
                    {typeof image === 'object' && image !== null && 'url' in image ? (
                        <Image
                            src={image.url || ''}
                            alt={image.alt || 'Study in course image'}
                            width={image.width || 836}
                            height={image.height || 836}
                            className="z-10 relative sm:right-[20px] right-[48px] bottom-[7px]"
                        />
                    ) : (
                        <div>Image not found</div>
                    )}
                </div>
            </div>
        </section >
    );
};

export default StudyInCourse;