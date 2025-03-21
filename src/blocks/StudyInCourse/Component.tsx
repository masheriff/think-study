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
        <section className={cn("container", className)}>
            <div className="bg-[#D9F1FD] rounded-3xl flex flex-col md:flex-row min-h-[600px] p-4 sm:p-6 md:p-8 overflow-hidden">
                {/* Left container */}
                <div
                    className="md:w-1/2 lg:w-4/6 flex items-center justify-center py-8 md:py-0"
                    aria-labelledby="study-title study-country"
                >
                    <div className="text-center md:text-left">
                        <h2
                            id="study-title"
                            className="text-[32px] font-roboto md:text-[45px] lg:text-[65px] text-[#000000] leading-none font-semibold mb-2 line-clamp-3"
                        >
                            {title}
                        </h2>
                        <p
                            id="study-country"
                            className="text-[50px] md:text-[80px] lg:text-[156px] text-[#000000] font-montserrat font-bold leading-none truncate"
                        >
                            {country}
                        </p>
                    </div>
                </div>

                {/* Right container */}
                <div
                    className="md:w-1/2 lg:w-2/6 bg-[#C1F177] rounded-3xl relative mt-4 md:mt-0 overflow-hidden h-[450px] md:aspect-auto md:h-auto"
                    aria-label={`Visual representation of studying in ${country}`}
                >
                    {typeof image === 'object' && image !== null && 'url' in image ? (
                        <Image
                            src={image.url || ''}
                            alt={image.alt || `Education opportunities in ${country}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={true}
                        />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center">
                            <p className="text-gray-700">Image not found</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StudyInCourse;