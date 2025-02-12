'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { WorldStudentBlock as WorldStudentBlockType } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';

type Props = WorldStudentBlockType & {
    className?: string;
};

export const WorldStudentBlock: React.FC<Props> = (props) => {
    const {
        className,
        backgroundImage,
        title,
        items
    } = props;

    console.log('title', title);

    // Helper function to create curved path between two points
    const _createCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
        const midX = (startX + endX) / 2;
        const curveHeight = Math.abs(endX - startX) * 0.3;
        return `M ${startX} ${startY} Q ${midX} ${Math.min(startY, endY) - curveHeight} ${endX} ${endY}`;
    };

    // Predefined positions for the markers
    const positions = [
        { left: '20%', top: '30%' }, // USA
        { left: '25%', top: '25%' }, // Canada
        { left: '45%', top: '20%' }, // UK (Liverpool)
        { left: '60%', top: '35%' }, // Medical School
        { left: '75%', top: '45%' }, // Australia (Monash)
    ];

    return (
        <section className="block">
            <hr className='w-1/2 mx-auto' />
            <div className="block mt-12">
                <RichText className="text-center" data={title} />
            </div>
            <div className={cn('relative w-full h-[700px] overflow-hidden', className)}>
                {backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={backgroundImage.url || ''}
                            alt="World Map Background"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="opacity-20"
                        />
                    </div>
                )}
                {items?.map((item, index) => {
                    const pos = positions[index % positions.length];
                    if (!pos) return null;

                    return (
                        <div
                            key={index}
                            className="absolute bg-white p-3 flex flex-row items-center justify-evenly rounded-full max-w-fit shadow-lg"
                            style={{
                                left: item.left || pos.left,
                                right: item.right || 'auto',
                                top: item.top || pos.top,
                                bottom: item.bottom || 'auto',
                                zIndex: item['z-index'] || 10
                            }}
                        >
                            {typeof item.image === 'object' && item.image !== null && 'url' in item.image && (
                                <Image
                                    src={item.image.url || ''}
                                    alt={item.title || ''}
                                    height={50}
                                    width={50}
                                />
                            )}
                            <div>
                                {item.title}
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
        // <section className={cn('relative w-full h-[600px] overflow-hidden', className)}>
        //     {/* Background Map */}
        //     {backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage && (
        //         <div className="absolute inset-0 z-0">
        //             <Image
        //                 src={backgroundImage.url || ''}
        //                 alt="World Map Background"
        //                 fill
        //                 style={{ objectFit: 'cover' }}
        //                 className="opacity-20"
        //             />
        //         </div>
        //     )}

        //     {/* Title */}
        //     <div className="text-center">
        //         <h2 className="text-3xl font-bold mb-2">
        //             {typeof title === 'string' ? title : ''}
        //         </h2>
        //     </div>

        //     {/* SVG for curved lines */}
        //     <svg className="absolute inset-0 w-full h-full pointer-events-none">
        //         <defs>
        //             <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        //                 <stop offset="0%" style={{ stopColor: '#e11d48', stopOpacity: 0.4 }} />
        //                 <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 0.4 }} />
        //             </linearGradient>
        //         </defs>
        //         {items?.map((_, index) => {
        //             const paths = [
        //                 createCurvedPath(200, 200, 400, 300),
        //                 createCurvedPath(300, 250, 500, 350),
        //                 createCurvedPath(400, 300, 600, 250),
        //                 createCurvedPath(500, 350, 700, 400),
        //                 createCurvedPath(600, 400, 800, 350),
        //             ];

        //             return (
        //                 <path
        //                     key={index}
        //                     d={paths[index % paths.length]}
        //                     fill="none"
        //                     stroke="url(#lineGradient)"
        //                     strokeWidth="2"
        //                     className="animate-draw"
        //                 />
        //             );
        //         })}
        //     </svg>

        //     {/* Student/University markers */}
        //     {items?.map((item, index) => {
        //         const pos = positions[index % positions.length];
        //         if (!pos) return null;

        //         return (
        //             <div
        //                 key={index}
        //                 className="absolute"
        //                 style={{
        //                     left: pos.left,
        //                     top: pos.top,
        //                     zIndex: item['z-index'] || 1
        //                 }}
        //             >
        //                 <div className="relative group">
        //                     {typeof item.image === 'object' && item.image !== null && 'url' in item.image && (
        //                         <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-white shadow-lg">
        //                             <Image
        //                                 src={item.image.url || ''}
        //                                 alt={item.title || ''}
        //                                 fill
        //                                 style={{ objectFit: 'cover' }}
        //                             />
        //                         </div>
        //                     )}
        //                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md whitespace-nowrap">
        //                         {item.title}
        //                     </div>
        //                 </div>
        //             </div>
        //         );
        //     })}
        // </section>
    );
};

export default WorldStudentBlock;