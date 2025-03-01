'use client';

import React from 'react';
import { cn } from '@/utilities/ui';
import Image from 'next/image';
import type { StudyInChecklist as StudyInChecklistType } from '@/payload-types';
import { GoDotFill } from "react-icons/go";

type Props = StudyInChecklistType & {
    className?: string;
};

export const StudyInChecklist: React.FC<Props> = (props) => {
    const {
        className,
        title,
        subtitle,
        checkItems,
        titleStyles,
        subStyles,
        image,
        imageBackgroundColor,
    } = props;

    console.log(imageBackgroundColor, image, "imageBackgroundColor")

    return (
        <section className={cn('container', className)}>
            <div className="flex bg-[#D9F1FD] rounded-3xl flex-col md:flex-row items-center overflow-hidden">
                {/* Left Text (80%) */}
                <div className="md:w-[60%] p-6  flex flex-col justify-start items-start md:items-start h-full">
                    <div>
                        <h2
                            className="text-3xl font-bold mb-4"
                            style={{
                                fontSize: titleStyles?.[0]?.fontSize || '2rem',
                                color: titleStyles?.[0]?.color || '#000000',
                            }}
                        >
                            {title}
                        </h2>
                        <h3
                            className="text-xl font-semibold mb-6"
                            style={{
                                fontSize: subStyles?.[0]?.fontSize || '1.5rem',
                                color: subStyles?.[0]?.color || '#FF0000',
                            }} >
                            {subtitle}
                        </h3>
                    </div>
                    <div>
                        <ul className="list-disc list-inside space-y-2">
                            {checkItems?.map((item, index) => (
                                <li
                                    key={index}
                                    className="text-base"
                                    style={{
                                        fontSize: item.Styles?.[0]?.fontSize || '1rem',
                                        color: item.Styles?.[0]?.color || '#000000',
                                    }}
                                >
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>

                {/* Right Image (40%) */}
                <div className="relative">
                    <div className="absolute z-0 top-[12px] ms-[78px] left-[-10px] bottom-0 w-[110%]  h-[97%] rounded-3xl"
                        style={{ backgroundColor: imageBackgroundColor || "#C1F177" }}>
                    </div>

                    {typeof image === 'object' && image !== null && 'url' in image ? (
                        <Image
                            src={image.url || ''}
                            alt={image.alt || 'Study in course image'}
                            width={image.width || 836}
                            height={image.height || 836}
                            className="z-10 relative left-[70px]"
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