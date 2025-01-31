'use client';

import React from 'react';
import type { CTABlock as CTABlockType } from '@/payload-types';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { cn } from '@/utilities/ui';

type Props = CTABlockType & {
    className?: string;
};

export const CTABlock: React.FC<Props> = (props) => {
    const {
        className,
        image,
        brandLogo,
        phoneNumbers,
        offices,
        tagline,
    } = props;

    return (
        <section className={cn('bg-[#f8f9fa] py-12 relative mx-auto rounded-xl overflow-hidden w-3/4', className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                    {/* Left Side: Contact Information */}
                    <div className="flex-1 z-10 ml-10">
                        <div className="mb-8">
                            <h3 className="text-red-500 font-medium text-lg italic mb-2">
                                {tagline || 'Call or WhatsApp'}
                            </h3>
                        </div>

                        {/* Contact Details Container */}
                        {offices && offices.length > 0 && (
                            <div className="flex flex-col gap-8">
                                {offices.map((office, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        {/* Phone Numbers Column */}
                                        <div className="flex flex-col">
                                            {phoneNumbers && (
                                                <div className="space-y-2">
                                                    {phoneNumbers.slice(index * 2, index * 2 + 2).map((phone, phoneIndex) => (
                                                        <a
                                                            key={phoneIndex}
                                                            href={`tel:${phone.number}`}
                                                            className="flex items-center text-gray-900 hover:text-red-500 transition-colors text-lg font-medium"
                                                        >
                                                            <Phone className="w-4 h-4 mr-2" />
                                                            {phone.number}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Curly Brace and Location */}
                                        <div className="flex items-center py-4 gap-2">
                                            <span className="text-2xl">{`}`}</span>
                                            <span className="text-red-500 font-medium">
                                                {office.location}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side: Logo and Image Container */}
                    <div className="relative flex-1">
                        {/* Main Image - Positioned absolutely */}
                        {image && typeof image === "object" && (
                            <div className="absolute right-0 top-[-40px] h-full z-20">
                                <Image
                                    src={image.url || ""}
                                    alt={image.alt || ""}
                                    width={500}
                                    height={600}
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Brand Logo - Overlaid on top */}
                        {brandLogo && typeof brandLogo === "object" && (
                            <div className="relative left-40 top-16 z-10">
                                <div className="bg-[#ff5757] rounded-lg px-6 py-4 inline-block">
                                    <Image
                                        src={brandLogo.url || ""}
                                        alt={brandLogo.alt || "Brand Logo"}
                                        width={180}
                                        height={45}
                                        className="h-10 w-auto"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTABlock;