'use client';

import React from 'react';
import Image from 'next/image';

type MediaType = {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
};

type Props = {
    className?: string;
    media?: MediaType;  // Make media optional to avoid crashes
};

export const WhyusMediaBlock: React.FC<Props> = ({ media, className }) => {
    if (!media || !media.url) {
        return <div className="text-center text-gray-500">No image available</div>;
    }

    return (
        <div className={`max-w-6xl mx-auto ${className}`}>
            <Image
                src={media.url}
                alt={media.alt || 'Media image'}
                width={media.width || 800}
                height={media.height || 600}
                className='rounded-2xl'

            />
        </div>
    );
};

export default WhyusMediaBlock;
