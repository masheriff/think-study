'use client';

import React from 'react';
import Image from 'next/image';
import type { GlobalUnivBlock as GlobalUnivBlockType } from '@/payload-types';
import { cn } from '@/utilities/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

type Props = GlobalUnivBlockType & {
    className?: string;
};

export const GlobalUnivBlock: React.FC<Props> = (props) => {
    const {
        className,
        universities,
        mapImage,
    } = props;

    return (
        <section className={cn('py-16', className)}>
            <div className="container mx-auto px-4">
                <div className="relative">
                    {/* World Map Base */}
                    {mapImage && typeof mapImage !== 'number' && 'url' in mapImage && (
                        <div className="relative h-[600px] w-full">
                            <Image
                                src={mapImage.url || ''}
                                alt="World Map"
                                fill
                                priority
                                style={{ objectFit: 'contain' }}
                                className="opacity-50"
                            />

                            {/* Connection Lines - These would need to be implemented with SVG paths */}
                            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                                {/* Example curved connection lines */}
                                <path
                                    d="M200,200 Q400,100 600,200"
                                    fill="none"
                                    stroke="rgba(59, 130, 246, 0.5)"
                                    strokeWidth="2"
                                />
                                {/* Add more paths for other connections */}
                            </svg>

                            {/* University Markers */}
                            {universities && universities.length > 0 && universities.map((university, index) => (
                                <div
                                    key={index}
                                    className="absolute group"
                                    style={{
                                        // These positions would need to be calculated based on actual coordinates
                                        left: `${(index + 1) * 20}%`,
                                        top: '30%',
                                    }}
                                >
                                    <div className="relative">
                                        <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                                            {university.image && typeof university.image !== 'number' && 'url' in university.image ? (
                                                <AvatarImage src={university.image.url || ''} alt={university.name} />
                                            ) : (
                                                <AvatarFallback>{university.name.charAt(0)}</AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md whitespace-nowrap">
                                            <span className="text-sm font-medium">{university.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GlobalUnivBlock;