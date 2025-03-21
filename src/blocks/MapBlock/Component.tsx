'use client';

import React, { useMemo } from 'react';
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
        branchOffices,
    } = props;

    // Calculate grid columns only when branchOffices changes
    const branchOfficeGridClass = useMemo(() => {
        if (!branchOffices?.length) return '';

        // Use Tailwind's built-in responsive grid utilities based on item count
        const count = branchOffices.length;

        if (count <= 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
        if (count === 3) return 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-3';
        if (count === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'; // Default for 5+ items
    }, [branchOffices]);

    return (
        <section className={cn('mx-4 md:container md:mx-auto', className)}>
            {/* Common Heading */}
            {heading && (
                <h2 className="text-3xl font-bold mb-8 text-center">
                    {heading}
                </h2>
            )}

            {/* Offices List with Iframes */}
            {offices?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl p-6 md:p-12 bg-gray-200 md:ml-[-2rem] md:mr-[-2rem]">
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

            {branchOffices && branchOffices?.length > 0 && (
                <>
                    <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-600">
                        Branch Offices
                    </h2>
                    <div className={`grid ${branchOfficeGridClass} gap-8`}>
                        {branchOffices.map((branchOffice, index) => (
                            <div key={index} className="flex flex-col space-y-4">
                                <h3 className="text-xl font-bold text-gray-600">{branchOffice.name}</h3>
                                <p className="text-gray-600 whitespace-pre-line">{branchOffice.address}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default MapBlock;