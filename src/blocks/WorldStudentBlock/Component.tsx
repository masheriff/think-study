'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import type { WorldStudentBlock as WorldStudentBlockType } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';

type Props = WorldStudentBlockType & {
    className?: string;
};

export const WorldStudentBlock: React.FC<Props> = (props) => {
    const {
        backgroundImage,
        title,
        items
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    // Fixed position for the center point
    const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
    const [itemPositions, setItemPositions] = useState<Array<{ x: number, y: number }>>([]);

    // Helper function to create curved path between two points
    const createCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
        const midX = (startX + endX) / 2;
        const curveHeight = Math.abs(endX - startX) * 0.3;
        return `M ${startX} ${startY} Q ${midX} ${Math.min(startY, endY) - curveHeight} ${endX} ${endY}`;
    };

    // Array of colors for each line
    const lineColors = [
        '#FF5733', // Orange-red
        '#33FF57', // Green
        '#3357FF', // Blue
        '#F033FF', // Pink
        '#640D5F', // Violet
    ];

    // Predefined positions for the markers
    const positions = [
        { left: '20%', top: '30%' }, // USA
        { left: '25%', top: '25%' }, // Canada
        { left: '03%', top: '50%' }, // UK (Liverpool)
        { left: '60%', top: '35%' }, // Medical School
        { left: '75%', top: '45%' }, // Australia (Monash)
    ];

    // Calculate center point and item positions after component mounts and whenever window resizes
    useEffect(() => {
        const calculatePositions = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();

                // Set center point to the specified position (right: 30%, top: 45%)
                setCenterPoint({
                    x: containerRect.width * 0.7, // 100% - 30%
                    y: containerRect.height * 0.45
                });

                // Calculate absolute positions for each item
                const itemRects = Array.from(containerRef.current.querySelectorAll('.marker-item'))
                    .map(item => {
                        const rect = item.getBoundingClientRect();
                        const relativeRect = {
                            x: rect.left - containerRect.left + rect.width / 2,
                            y: rect.top - containerRect.top
                        };
                        return relativeRect;
                    });

                setItemPositions(itemRects);
            }
        };

        // Initial calculation
        calculatePositions();

        // Recalculate when window resizes
        window.addEventListener('resize', calculatePositions);

        return () => {
            window.removeEventListener('resize', calculatePositions);
        };
    }, [items]);

    return (
        <section className="block my-[-2rem]">
            <hr className='w-1/2 mx-auto' />
            <div className="block mt-10">
                <RichText className="text-center" data={title} />
            </div>
            <div
                ref={containerRef}
                className="w-full overflow-hidden relative h-[500px] mx-auto"
            >
                {backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage && (
                    <Image
                        src={backgroundImage.url || ''}
                        alt="World Map Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="opacity-20"
                    />
                )}

                {/* SVG for the connecting lines with gradients */}
                <svg
                    className="absolute top-[65px] left-[-50px] w-full h-full"
                    style={{ pointerEvents: 'none', zIndex: 5 }}
                >
                    <defs>
                        {itemPositions.map((pos, idx) => (
                            <linearGradient
                                key={`gradient-${idx}`}
                                id={`lineGradient-${idx}`}
                                gradientUnits="userSpaceOnUse"
                                x1={pos.x} y1={pos.y}
                                x2={centerPoint.x} y2={centerPoint.y}
                            >
                                <stop offset="0%" stopColor={lineColors[idx % lineColors.length]} stopOpacity="0.2" />
                                <stop offset="100%" stopColor={lineColors[idx % lineColors.length]} stopOpacity="1" />
                            </linearGradient>
                        ))}
                    </defs>

                    {itemPositions.map((pos, idx) => (
                        <path
                            key={`path-${idx}`}
                            d={createCurvedPath(pos.x, pos.y, centerPoint.x, centerPoint.y)}
                            stroke={`url(#lineGradient-${idx})`}
                            strokeWidth="3"
                            fill="none"
                        />
                    ))}
                </svg>

                {/* Central point */}
                {/* <div
                    className="absolute bg-blue-600 rounded-full w-3 h-3"
                    style={{
                        right: `calc(32.2% - 8px)`,
                        top: `calc(54% - 8px)`,
                        zIndex: 20
                    }}
                /> */}

                {items?.map((item, index) => {
                    const pos = positions[index % positions.length];
                    if (!pos) return null;

                    return (
                        <div
                            key={index}
                            className="marker-item absolute bg-white p-2 flex flex-row items-center justify-around rounded-full w-44 shadow-lg"
                            style={{
                                left: item.left || pos.left,
                                right: item.right || 'auto',
                                top: item.top || pos.top,
                                bottom: item.bottom || 'auto',
                                zIndex: 10
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
    );
};

export default WorldStudentBlock;