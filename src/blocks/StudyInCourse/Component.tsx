'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui'; // Assuming you have a utility for class names
import type { StudyInCourse as StudyInCourseType } from '@/payload-types';
// import { Media } from 'payload/generated-types'; // Import Media type

type Props = StudyInCourseType & {
    className?: string;
};

type TextStyle = {
    fontWeight: number;
    fontSize: number;
    lineHeight: number;
    color: string;
};

type CountryStyles = {
    fontWeight?: number;
    fontSize?: number;
    lineHeight?: number;
    color?: string;
};

export const StudyInCourse: React.FC<Props> = (props) => {
    const {
        className,
        title,
        country,
        image,
        titleStyles,
        countryStyles,
        imageBackgroundColor,
    } = props;

    return (
        <section className={cn('container ', className)} >
            <div className="flex bg-[#D9F1FD] rounded-3xl flex-col md:flex-row items-center overflow-hidden">
                {/* Left Text (80%) */}
                <div className="md:w-4/5 p-6 flex flex-col justify-center items-center md:items-center h-full">
                    <h2 className="text-4xl font-semibold mb-2"

                        style={{
                            color: titleStyles?.[0]?.Color || '#000000',
                            fontSize: titleStyles?.[0]?.Size || '65px',

                        }}
                    >
                        Study in the
                    </h2>
                    <h1 className="text-6xl font-bold"
                        style={{
                            color: countryStyles?.[0]?.Color || '#000000',
                            fontSize: countryStyles?.[0]?.Size || '156px',
                        }}
                    >
                        USA
                    </h1>
                </div>

                {/* Right Image (40%) */}
                <div className="relative">
                    <div className="absolute z-0 top-[12px] ms-[78px] left-0 bottom-0 w-[80%] mx-auto h-[95%] rounded-3xl"
                        style={{ backgroundColor: imageBackgroundColor || "#C1F177" }}>
                    </div>

                    {typeof image === 'object' && image !== null && 'url' in image ? (
                        <Image
                            src={image.url || ''}
                            alt={image.alt || 'Study in course image'}
                            width={image.width || 836}
                            height={image.height || 836}
                            className="z-10 relative right-[20px]"
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