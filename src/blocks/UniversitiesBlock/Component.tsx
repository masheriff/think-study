'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import type { UniversitiesBlock as UniversitiesBlockType } from '@/payload-types';

type Props = UniversitiesBlockType & {
    className?: string;
};

export const UniversitiesBlock: React.FC<Props> = (props) => {
    const {
        className,
        mainHeading,
        subHeading,
        description,
        stats,
        universitiesImages,
    } = props;

    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState<number>(250); // Default height

    useEffect(() => {
        if (!universitiesImages?.length || !marqueeRef.current) return;

        // Find the track element that will be animated
        const track = marqueeRef.current.querySelector('.marquee-track');
        if (!track) return;

        // Get original content
        const originalContent = track.querySelector('.marquee-content');
        if (!originalContent) return;

        // Clear any existing clones
        track.querySelectorAll('.marquee-clone').forEach(clone => clone.remove());

        // Create a deep clone of the content
        const clone = originalContent.cloneNode(true) as HTMLElement;
        clone.classList.add('marquee-clone');

        // Append the clone to the track
        track.appendChild(clone);

        // Calculate animation duration based on content height
        const contentHeight = originalContent.clientHeight;
        const duration = Math.max(10, contentHeight / 25); // At least 10 seconds

        // Set the animation speed
        marqueeRef.current.style.setProperty('--scroll-speed', `${duration}s`);

        // Calculate optimal container height based on content
        // We need the height to be enough to show at least 2-3 rows
        // This is a rough calculation - adjust multiplier as needed
        const rowHeight = 64; // Estimated height of a row including padding
        const visibleRows = Math.min(
            Math.ceil(universitiesImages.length / (window.innerWidth >= 1024 ? 12 : window.innerWidth >= 640 ? 6 : 4)),
            4 // Maximum 4 rows visible at once
        );
        const optimalHeight = Math.max(rowHeight * (visibleRows + 1), 250); // At least 250px or enough for visible rows + 1

        setContainerHeight(optimalHeight);
    }, [universitiesImages]);

    return (
        <section className={cn("my-8", className)}>
            <div className="container md:p-0 p-10">
                <div className="text-left md:w-3/4 w-full">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">{mainHeading}</h2>
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-3">
                        {subHeading}
                    </h2>
                    <p className='text-gray-600 md:text-lg mb-3'>{description}</p>
                    {/* Statistics */}
                    {stats && stats.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="text-sm md:text-sm font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* University Images - Vertical Marquee */}
                {universitiesImages && universitiesImages.length > 0 && (
                    <div
                        className="relative mt-16 overflow-hidden"
                        style={{ height: `${containerHeight}px` }}
                    >
                        {/* Top Gradient Overlay */}
                        <div className="w-full absolute top-0 h-20 bg-gradient-to-b from-white to-transparent z-10"></div>

                        <div
                            ref={marqueeRef}
                            className="marquee-container w-full h-full overflow-hidden"
                        >
                            <div className="marquee-track">
                                <div ref={contentRef} className="marquee-content grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 p-2">
                                    {universitiesImages.map((universityImage, index) =>
                                        typeof universityImage.image !== 'number' && 'url' in universityImage.image ? (
                                            <div
                                                key={index}
                                                className="p-2 bg-[#F5F5F5] rounded-xl"
                                            >
                                                <div className="w-full h-12 relative">
                                                    <Image
                                                        src={universityImage.image.url || ''}
                                                        alt="University Logo"
                                                        fill
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                </div>
                                            </div>
                                        ) : null
                                    )}
                                </div>
                                {/* The clone will be inserted here by JavaScript */}
                            </div>
                        </div>

                        {/* Bottom Gradient Overlay */}
                        <div className="w-full absolute bottom-0 h-20 bg-gradient-to-b from-transparent to-white z-10"></div>
                    </div>
                )}
                <hr className="mt-32 w-96 mx-auto" />
            </div>
        </section>
    );
};

export default UniversitiesBlock;