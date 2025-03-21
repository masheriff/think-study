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
            <div className="bg-[#D9F1FD] rounded-3xl flex flex-col md:flex-row min-h-[645px] p-4 sm:p-6 md:p-8 gap-8 overflow-hidden">
                {/* Left Text Container */}
                <div className="w-full md:w-4/6 flex flex-col items-start justify-center py-6 md:py-0">
                    <div className='text-center sm:text-start w-full'>
                        <h2
                            className="font-semibold font-roboto mb-0 text-black text-[20px] md:text-[32px] lg:text-[40px] xl:text-[45px] 3xl:text-[50px]"
                        >
                            {title}
                        </h2>

                        <h3 className="font-bold mb-4 sm:mb-[10px] text-[30px] font-mynerve md:text-[45px] lg:text-[43px] xl:text-[57px] 3xl:text-[68px] sm:leading-none leading-tight text-[#FF0000]">
                            {subtitle}
                        </h3>
                    </div>
                    <div className="w-full">
                        <ul className="sm:block w-full sm:ms-[10px] list-disc pl-5 space-y-1">
                            {checkItems?.map((item, index) => (
                                <li
                                    key={index}
                                    className="font-normal leading-tight pb-[3px] font-roboto text-[16px] md:text-[18px] lg:text-[17px] text-[#000000]"
                                >
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>




                {/* Right Image Container */}
                <div className="w-full md:w-2/6 bg-[#C1F177] rounded-3xl relative h-[500px] md:h-auto mt-4 md:mt-0 overflow-hidden">
                    {typeof image === 'object' && image !== null && 'url' in image ? (
                        <Image
                            src={image.url || ''}
                            alt={image.alt || 'Study in course image'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            priority={true}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                            Image not found
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StudyInChecklist;