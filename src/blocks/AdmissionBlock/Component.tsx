'use client'

import React from 'react'
import type { AdmissionBlock as AdmissionBlockType } from '@/payload-types'
import { CurlyBraces } from '@/components/thinkstudy-svg/index'
import { HorizontalLineScroll, VerticalLineScroll } from '@/components/Animation'

type Props = AdmissionBlockType & {
    className?: string
}

const formatDescription = (desc: string) => {
    const words = desc.split(' ');
    return {
        firstPart: words.slice(0, 2).join(' '),
        restPart: words.slice(2).join(' ')
    };
};

export const AdmissionBlock: React.FC<Props> = ({
    year = '',
    description = '',
    day = '',
    currentYear = '',
    currentDescription = '',
    successRate = '',
    ambitions = '',
    statistics = [],
    courses = [],
    className = ''
}) => {
    const currentDesc = formatDescription(currentDescription);
    const mainDesc = formatDescription(description);

    return (
        <section
            className={`container ${className}`}
            aria-labelledby="admission-block-title"
        >
            <div
                className="p-4 md:p-6 mx-auto relative flex flex-col bg-[#D9F1FD] rounded-3xl md:flex-row items-start md:items-center"
                role="region"
                aria-label="Admission Information"
            >
                {/* Left Timeline */}
                <div className="relative md:w-[50%] ms-2 md:ms-4 my-4 md:my-8 w-full">
                    {/* Vertical line for tablet and desktop */}
                    <div className="hidden md:block">
                        <VerticalLineScroll />
                    </div>

                    {/* Horizontal line for mobile */}
                    <div className="md:hidden">
                        <HorizontalLineScroll />
                    </div>

                    <div className="flex md:flex-col md:h-[405px] w-full md:ms-[50px]">
                        {/* Current Year Section */}
                        <div className="order-2 md:order-none w-1/2 md:w-full text-start pr-2 md:pr-0 space-y-2 md:space-y-3">
                            <h2 className="text-3xl font-bold md:text-2xl">{currentYear}</h2>
                            <h3 className="text-xl md:text-4xl font-medium">{day}</h3>
                            <p className="italic font-light font-mynerve text-lg md:text-[26px] leading-none">
                                <span>{currentDesc.firstPart}</span>
                            </p>
                            <span className="italic font-light font-mynerve text-lg md:text-[26px]">
                                {currentDesc.restPart}
                            </span>
                        </div>

                        {/* Year Description Section */}
                        <div className="order-1 md:order-none w-1/2 md:w-full text-start pl-2 md:pl-0 md:mt-auto space-y-2 md:space-y-3">
                            <h2 className="text-3xl font-bold md:text-2xl">{year}</h2>
                            <p className="text-xl md:text-4xl font-medium">
                                <span>{mainDesc.firstPart}</span>
                            </p>
                            <p className='italic font-light font-mynerve text-lg md:text-[26px]'>
                                {mainDesc.restPart}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="md:w-[70%] px-3 md:px-6 lg:px-0 md:ps-[50px] mt-4 md:mt-0 w-full">
                    <p className="text-[#FF0000] mb-1 italic font-medium font-mynerve text-xl md:text-[26px]">
                        {ambitions}
                    </p>

                    <p className="text-sm md:text-base font-normal max-w-[430px]">
                        {successRate}
                    </p>

                    {/* Statistics */}
                    <div className="mt-2 text-xs md:text-sm font-semibold flex flex-wrap items-center gap-1 max-w-full overflow-hidden">
                        {statistics?.map((stat, index) => (
                            <div
                                key={index}
                                className="font-normal max-w-[430px] text-center flex gap-1"
                            >
                                <h3 className="text-sm md:text-base font-bold italic">
                                    {stat.value}
                                </h3>
                                <p className="text-sm md:text-base font-bold italic">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Courses */}
                    <div className="mt-4 md:mt-6">
                        <div className="flex items-center gap-2 md:gap-3 md:ms-[-46px]">
                            <div className="flex items-center gap-0 flex-col me-1 md:me-[10px]">
                                <div className="text-[14px] sm:text-[20px] md:text-[25px] font-medium mb-0 md:mb-1">
                                    We excel in
                                </div>
                                <div className="text-[8px] md:text-[10px] mt-0">
                                    (UG & PG)
                                </div>
                            </div>

                            <div className="absolute ms-[80px] sm:ms-[155px] md:ms-[105px] lg:ms-[161px]">
                                <CurlyBraces />
                            </div>

                            <div>
                                <ul className="list-none mt-2 space-y-0 md:space-y-1 ps-12 md:ps-16">
                                    {courses?.map((course, index) => (
                                        <li
                                            key={index}
                                            className="text-[14px] sm:text-sm md:text-sm font-medium"
                                        >
                                            {course.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AdmissionBlock;