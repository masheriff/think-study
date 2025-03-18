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

    // Helper function to create curved path between two points with increased curvature
    const createCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
        const midX = (startX + endX) / 2;
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const curveHeight = distance * 0.4; // Reduced from 0.7 to 0.4 for less pronounced curves

        // Force the control point to be above both points
        const controlY = Math.min(startY, endY) - curveHeight;

        return `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
    };

    // Array of colors for each line
    const lineColors = [
        '#F033FF', // Pink
        '#3357FF', // Blue
        '#FF5733', // Orange-red
        '#33FF57', // Green
        '#640D5F', // Violet
        '#1D8489', // Teal blue
    ];

    // Keep the original desktop positions
    const defaultPositions = [
        { left: '15%', top: '50%' }, // USA
        { left: '15%', top: '28%' }, // Canada
        { left: '38%', top: '15%' }, // UK (Liverpool)
        { left: '60%', top: '60%' }, // Medical School
        { left: '70%', top: '85%' }, // Australia (Monash)
        { left: '75%', top: '30%' }, // (St. Petersburg) Russia
    ];

    // Responsive positions for the markers based on screen size
    const getResponsivePositions = () => {
        // Check if window exists (to avoid SSR issues)
        if (typeof window === 'undefined') return defaultPositions;

        const width = window.innerWidth;

        if (width < 640) { // Mobile view
            return [
                { left: '5%', top: '20%' }, // USA
                { left: '10%', top: '-9%' }, // Canada
                { left: '35%', top: '15%' }, // UK
                { left: '55%', top: '65%' }, // Medical School
                { left: '75%', top: '80%' }, // Australia
                { left: '75%', top: '10%' }, // Russia
            ];
        } else if (width < 1024) { // Tablet view
            return [
                { left: '12%', top: '20%' }, // USA
                { left: '9%', top: '0%' }, // Canada
                { left: '35%', top: '15%' }, // UK
                { left: '58%', top: '60%' }, // Medical School
                { left: '70%', top: '80%' }, // Australia
                { left: '67%', top: '9%' }, // Russia
            ];
        } else { // Desktop view - original positions
            return defaultPositions;
        }
    };

    // Get the current positions based on screen size
    const [positions, setPositions] = useState(defaultPositions);

    useEffect(() => {
        // Update positions based on screen size
        const handleResize = () => {
            setPositions(getResponsivePositions());
        };

        // Call once on mount
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const calculatePositions = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const width = window.innerWidth;

                // Set center point based on screen size
                // Mobile: Wider container with proper scale
                if (width < 640) {
                    setCenterPoint({
                        x: containerRect.width * 0.67, // Center on mobile
                        y: containerRect.height * 0.35  // Lower on mobile
                    });
                } else if (width < 1024) { // Tablet
                    setCenterPoint({
                        x: containerRect.width * 0.67,
                        y: containerRect.height * 0.4
                    });
                } else { // Desktop - keep original
                    setCenterPoint({
                        x: containerRect.width * 0.67,
                        y: containerRect.height * 0.45
                    });
                }

                // Calculate absolute positions for each item, targeting the top-center
                const itemRects = Array.from(containerRef.current.querySelectorAll('.marker-item'))
                    .map(item => {
                        const rect = item.getBoundingClientRect();
                        const relativeRect = {
                            x: rect.left - containerRect.left + rect.width / 2, // Center X
                            y: rect.top - containerRect.top // Top Y
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
    }, [items, positions]);

    return (
        <section className="block my-[-2rem] overflow-visible">
            <hr className='w-1/2 mx-auto' />
            <div className="max-w-3xl mx-4 md:mx-auto my-10">
                <RichText className="text-center" data={title} />
            </div>
            <div
                ref={containerRef}
                className="container relative mx-auto px-4 py-8 sm:py-0 h-[300px] md:h-[550px] lg:h-[600px] overflow-visible"
                style={{ position: 'relative' }}
            >
                <div className="relative w-full h-full">
                    {/* Desktop background image */}
                    {backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage && (
                        <div className="hidden lg:block w-full h-full">
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

                    {/* Mobile and tablet background image */}
                    <div className="block lg:hidden w-full h-full">
                        <Image
                            src="/assets/images/mobile-map.png"
                            alt="Mobile World Map Background"
                            fill
                            style={{
                                objectFit: 'contain',
                                objectPosition: 'center'
                            }}
                        />
                    </div>

                    {/* SVG for the connecting lines with gradients */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            pointerEvents: 'none',
                            zIndex: 5,
                            overflow: 'visible' // Ensure curves don't get cut off
                        }}
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
                                    <stop offset="0%" stopColor={lineColors[idx % lineColors.length]} stopOpacity="0.6" />
                                    <stop offset="100%" stopColor={lineColors[idx % lineColors.length]} stopOpacity="1" />
                                </linearGradient>
                            ))}
                        </defs>

                        {itemPositions.map((pos, idx) => (
                            <path
                                key={`path-${idx}`}
                                d={createCurvedPath(pos.x, pos.y, centerPoint.x, centerPoint.y)}
                                stroke={`url(#lineGradient-${idx})`}
                                strokeWidth="2"
                                fill="none"
                            />
                        ))}
                    </svg>

                    {items?.map((item, index) => {
                        const pos = positions[index % positions.length];
                        if (!pos) return null;

                        return (
                            <div
                                key={index}
                                className="marker-item absolute bg-white p-1 md:p-2 flex flex-row items-center justify-between rounded-full shadow-lg text-xs md:text-sm lg:text-base"
                                style={{
                                    zIndex: 10,
                                    left: item.left || pos.left,
                                    right: item.right || 'auto',
                                    top: item.top || pos.top,
                                    bottom: item.bottom || 'auto',
                                    maxWidth: '90%'
                                }}
                            >
                                {typeof item.image === 'object' && item.image !== null && 'url' in item.image && (
                                    <Image
                                        src={item.image.url || ''}
                                        alt={item.title || ''}
                                        height={50}
                                        width={50}
                                        className='w-8 h-8 md:w-[50px] md:h-[50px] mr-2'
                                    />
                                )}
                                <div>
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

export default WorldStudentBlock;