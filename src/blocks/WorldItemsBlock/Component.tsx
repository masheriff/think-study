'use client';

import React from 'react';
import Image from 'next/image';
import type { WorldItemsBlock as WorldItemsBlockType } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Marquee from "react-fast-marquee";

type Props = WorldItemsBlockType & {
    className?: string;
};

export const WorldItemsBlock: React.FC<Props> = (props) => {
    const {
        backgroundImage,
        title,
        items,
        countryCarousel
    } = props;

    return (
        <section className="block my-[-2rem] overflow-visible">
            <hr className="w-1/3 mx-auto" />
            <div className="max-w-3xl mx-4 md:mx-auto my-10">
                <RichText className="text-center" data={title} />
            </div>
            <div className="container p-0 relative h-[300px] md:h-[450px] lg:h-[600px]">
                {/* Background image for desktop */}
                {backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage && (
                    <div className="w-full h-full relative">
                        <Image
                            src={backgroundImage.url || ''}
                            alt="World Map Background"
                            fill
                            style={{
                                objectFit: 'contain',
                                objectPosition: 'center'
                            }}
                        />
                    </div>
                )}
                {/* Marker items */}
                {items?.map((item, index) => {
                    // Extract alignment and position values
                    const vAlign = item.vAlign || 'top';
                    const hAlign = item.hAlign || 'left';
                    const vPos = `${item.vPos || 50}%`;
                    const hPos = `${item.hPos || 50}%`;

                    // Style object with dynamic positioning
                    const style: React.CSSProperties = {
                        zIndex: item['z-index'] || 10,
                        maxWidth: 'max-content', // Fix for the maxWidth issue
                    };

                    // Apply positioning based on alignment
                    style[vAlign] = vPos;
                    style[hAlign] = hPos;

                    // Set the other dimensions to auto
                    style[vAlign === 'top' ? 'bottom' : 'top'] = 'auto';
                    style[hAlign === 'left' ? 'right' : 'left'] = 'auto';

                    // Check if stack exists and has items
                    const hasStack = item.stack && item.stack.length > 0;

                    return (
                        <div key={item.id || index} style={style} className='absolute'>
                            <div className="relative">
                                {/* Only render stack if it exists */}
                                {hasStack && item.stack?.map((stackItem, stackIndex) => {
                                    const isEven = stackIndex % 2 === 0;
                                    // Position stacks at top right instead of bottom right
                                    const offsetY = -(stackIndex + 1) * 7;
                                    const offsetX = -(stackIndex + 1) * 7;

                                    return (
                                        <div
                                            key={`stack-${stackIndex}`}
                                            className={`absolute flex flex-col ${isEven ? 'bg-[#D9F1FD]' : 'bg-[#C1F177]'} rounded-lg md:rounded-lg lg:rounded-xl w-12 md:w-16 lg:w-20 shadow-lg`}
                                            style={{
                                                top: offsetY,
                                                right: offsetX,
                                                zIndex: -(stackIndex + 1)
                                            }}
                                        >
                                            {/* Main item style applied to stack */}
                                            {typeof stackItem.stackImage === 'object' &&
                                                stackItem.stackImage !== null &&
                                                'url' in stackItem.stackImage && (
                                                    <Image
                                                        src={stackItem.stackImage.url || ''}
                                                        alt=""
                                                        height={50}
                                                        width={50}
                                                        className='w-12 h-10 md:w-16 md:h-12 lg:w-20 lg:h-16 rounded-lg md:rounded-lg lg:rounded-xl'
                                                    />
                                                )}
                                            {/* Empty div to match the main item style/structure */}
                                            <div className='p-1 rounded-xl'>
                                                <div className='text-[10px] lg:text-[14px] font-medium line-clamp-1'>
                                                    {item.title}
                                                </div>
                                                <div className='text-[6px] lg:text-[8px] line-clamp-3 md:line-clamp-3 lg:line-clamp-3'>
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Main content (top layer) */}
                                <div className='relative z-10 flex flex-col bg-[#C1F177] rounded-lg md:rounded-lg lg:rounded-xl w-12 md:w-16 lg:w-20 shadow-lg'>
                                    {typeof item.image === 'object' && item.image !== null && 'url' in item.image && (
                                        <Image
                                            src={item.image.url || ''}
                                            alt={item.title || ''}
                                            height={50}
                                            width={50}
                                            className='w-12 h-10 md:w-16 md:h-12 lg:w-20 lg:h-16 rounded-lg md:rounded-lg lg:rounded-xl'
                                        />
                                    )}
                                    <div className='p-1 rounded-xl'>
                                        <div className='text-[10px] lg:text-[14px] font-medium line-clamp-1'>
                                            {item.title}
                                        </div>
                                        <div className='text-[6px] lg:text-[8px] line-clamp-3 md:line-clamp-3 lg:line-clamp-3'>
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="container p-0 mt-8">
                <Marquee pauseOnHover={true}>
                    {countryCarousel?.map((item, index) => {
                        return (
                            typeof item === 'object' && 'code' in item && 'name' in item ? (
                                <div key={item.code || index} className='flex flex-col items-center gap-2 mx-3 md:mx-8 font-mynerve text-xs md:text-sm'>
                                    <Image
                                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.code}.svg`}
                                        alt={item.name || ''}
                                        height={60}
                                        width={60}
                                        className='shadow-lg rounded-lg'
                                    />
                                    {item.name}
                                </div>
                            ) : (
                                null
                            )
                        );
                    })}
                </Marquee>
            </div>
        </section>
    );
};

export default WorldItemsBlock;