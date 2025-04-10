'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import type { WorldItemsBlock as WorldItemsBlockType } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';

type Props = WorldItemsBlockType & {
    className?: string;
};

export const WorldItemsBlock: React.FC<Props> = (props) => {
    const {
        backgroundImage,
        title,
        items,
        centerPoint
    } = props;


    const containerRef = useRef<HTMLDivElement>(null);
    const [itemPositions, setItemPositions] = useState<Array<{ x: number, y: number }>>([]);
    const [centerPosition, setCenterPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    // Create curved path between two points with controlled curvature
    const createCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
        const midX = (startX + endX) / 2;
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const curveHeight = distance * 0.4;

        // Force control point to be above both points for consistent curve style
        const controlY = Math.min(startY, endY) - curveHeight;

        return `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
    };

    // Line colors for the curved connections
    const lineColors = [
        '#F033FF', // Pink
        '#3357FF', // Blue
        '#FF5733', // Orange-red
        '#33FF57', // Green
        '#640D5F', // Violet
        '#1D8489', // Teal blue
    ];

    // Calculate positions based on current container dimensions
    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();

            // Set center point based on CMS data (or defaults if not provided)
            const xPercent = centerPoint?.xPosition ?? 67;
            const yPercent = centerPoint?.yPosition ?? 45;

            setCenterPosition({
                x: containerRect.width * (xPercent / 100),
                y: containerRect.height * (yPercent / 100)
            });

            // Calculate marker positions
            const markers = containerRef.current.querySelectorAll('.marker-item');
            const newPositions = Array.from(markers).map(marker => {
                const rect = marker.getBoundingClientRect();
                return {
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top
                };
            });

            setItemPositions(newPositions);
        };

        // Initialize on mount and update on resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [centerPoint, items]);

    return (
        <section className="block my-[-2rem] overflow-visible">
            <hr className='w-1/2 mx-auto' />
            <div className="max-w-3xl mx-4 md:mx-auto mt-10">
                <RichText className="text-center" data={title} />
            </div>
            <div
                ref={containerRef}
                className="container relative mx-auto my-0 md:my-16 px-4 py-8 sm:py-0 h-[300px] md:h-[550px] lg:h-[600px] overflow-hidden"
                style={{ position: 'relative' }}
            >
                <div className="relative w-full h-full">
                    {/* Background image for all devices */}
                    {backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage && (
                        <div className="w-full h-full">
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

                    {/* SVG for connection lines */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            pointerEvents: 'none',
                            zIndex: 5,
                            overflow: 'visible'
                        }}
                    >
                        <defs>
                            {itemPositions.map((pos, idx) => (
                                <linearGradient
                                    key={`gradient-${idx}`}
                                    id={`lineGradient-${idx}`}
                                    gradientUnits="userSpaceOnUse"
                                    x1={pos.x} y1={pos.y}
                                    x2={centerPosition.x} y2={centerPosition.y}
                                >
                                    <stop offset="0%" stopColor={lineColors[idx % lineColors.length]} stopOpacity="0.6" />
                                    <stop offset="100%" stopColor={lineColors[idx % lineColors.length]} stopOpacity="1" />
                                </linearGradient>
                            ))}
                        </defs>

                        {itemPositions.map((pos, idx) => (
                            <path
                                key={`path-${idx}`}
                                d={createCurvedPath(pos.x, pos.y, centerPosition.x, centerPosition.y)}
                                stroke={`url(#lineGradient-${idx})`}
                                strokeWidth="2"
                                fill="none"
                            />
                        ))}
                    </svg>

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

                        return (
                            <div
                                key={index}
                                className="marker-item absolute bg-white p-1 md:p-2 flex flex-row items-center rounded-full shadow-lg text-xs md:text-sm lg:text-base"
                                style={style}
                            >
                                {typeof item.image === 'object' && item.image !== null && 'url' in item.image && (
                                    <Image
                                        src={item.image.url || ''}
                                        alt={item.title || ''}
                                        height={50}
                                        width={50}
                                        className='w-8 h-8 rounded-full md:w-[40px] md:h-[40px] mr-2'
                                    />
                                )}
                                <div className="whitespace-nowrap">
                                    {item.title}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WorldItemsBlock;