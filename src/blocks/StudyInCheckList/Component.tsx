'use client';

import React from 'react';
import { cn } from '@/utilities/ui';
import Image from 'next/image';
import type { StudyInChecklist as StudyInChecklistType } from '@/payload-types';

type Props = StudyInChecklistType & {
    className?: string;
};

export const StudyInChecklist: React.FC<Props> = (props) => {
    const {
        className,
        title,
        subtitle,
        checkItems,
        image,
    } = props;

    return (
        <section className={cn('container', className)}>
            <div className="flex bg-[#D9F1FD] sm:p-12 p-4 rounded-3xl flex-col xl:flex-row items-center overflow-hidden">
                {/* Left Text (80%) */}
                <div className="xl:w-[80%] w-full p-6 flex flex-col justify-start items-start md:items-start h-full">
                    <div className='text-center sm:text-start'>
                        <h2
                            className="font-semibold font-roboto mb-0 text-black text-[20px]  md:text-[32px] lg:text-[50px]  xl:text-[50px]  3xl:text-[50px]"
                        >
                            {title}
                        </h2>

                        <h3 className="font-bold mb-4 sm:mb-[20px]  text-[30px] font-caveat md:text-[55px] lg:text-[68px] sm:leading-none leading-tight text-[#FF0000]">
                            {subtitle}
                        </h3>
                    </div>
                    <div>
                        <div className="sm:hidden">
                            <ol className=" sm:block list-decimal list-inside space-y-0">
                                {checkItems?.map((item, index) => (
                                    <li key={index} className="text-base font-roboto sm:text-[18px] pb-2 text-[#000000]">
                                        {item.text}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <ul className="hidden sm:block xl:w-[80%] w-full sm:ms-[10px]  list-disc list-inside space-y-0">
                            {checkItems?.map((item, index) => (
                                <li key={index} className="font-normal leading-tight pb-[5px] font-roboto md:text-[18px] lg:text-[19px] text-[#000000]">
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Image (40%) */}
                <div className="relative md:w-[40%]">
                    <div className="absolute z-0 top-[12px] sm:ms-[10px] ms-[6px] left-[-10px] bottom-0 sm:w-[110%] w-[101%] h-[97%] rounded-3xl bg-[#C1F177]">

                    </div>

                    {typeof image === 'object' && image !== null && 'url' in image ? (
                        <Image
                            src={image.url || ''}
                            alt={image.alt || 'Study in course image'}
                            width={image.width || 836}
                            height={image.height || 836}
                            className="z-10 relative sm:left-[24px] left-[-3px]"
                        />
                    ) : (
                        <div>Image not found</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StudyInChecklist;