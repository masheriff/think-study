'use client';

import React from 'react';
import { cn } from '@/utilities/ui';
import type { MapBlock as MapBlockType } from '@/payload-types';

type Props = MapBlockType & {
    className?: string;
};

export const MapBlock: React.FC<Props> = (props) => {
    const {
        className,
        heading,
        offices,
    } = props;

    return (
        <section className={cn('', className)}>
            <div className="container">
                {/* Common Heading */}
                {heading && (
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        {heading}
                    </h2>
                )}

                {/* Offices List with Iframes */}
                {offices && offices.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl p-10 bg-gray-200">
                        {offices.map((office, index) => (
                            <div key={index} className="flex flex-col">
                                {/* Office Iframe */}
                                <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-sm">
                                    <iframe
                                        src={office.mapIframe}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>

                                {/* Office Address */}
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold text-black mb-2">
                                        {office.name}
                                    </h3>
                                    <p className="text-black whitespace-pre-line">
                                        {office.address}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MapBlock;