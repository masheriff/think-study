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
        <div className={`mx-4 md:container md:mx-auto ${className}`}>
            <div className='h-[700px] md:h-[500px] relative'>
                <Image
                    src={media.url}
                    alt={media.alt || 'Media image'}
                    fill
                    className='rounded-3xl'

                />

            </div>

        </div>
    );
};

export default WhyusMediaBlock;
