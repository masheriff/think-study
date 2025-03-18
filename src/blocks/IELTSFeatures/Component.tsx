'use client';

import Image from 'next/image';
import type { IELTSFeatures as IELTSFeaturesType } from '@/payload-types';
import { cn } from '@/utilities/ui';
import { CheckBox } from "../../components/thinkstudy-svg/index";

type Props = IELTSFeaturesType & {
    className?: string;
};

export const IELTSFeatures: React.FC<Props> = ({
    Heading,
    featuresList,
    studentImage,
    className,
}) => {
    return (
        <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <section className={cn('bg-[#D9F1FD] rounded-3xl py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12', className)}>
                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Student Image - First in desktop view, last in mobile/tablet */}
                        <div className="flex justify-center md:justify-start order-2 md:order-1">
                            {studentImage && typeof studentImage === 'object' && studentImage?.url && (
                                <Image
                                    src={studentImage.url}
                                    alt={studentImage.alt || "IELTS Student"}
                                    width={400}
                                    height={500}
                                    className="rounded-3xl shadow-xl bg-[#C1F177]"
                                />
                            )}
                        </div>

                        {/* Features List - First in mobile/tablet, second in desktop */}
                        <div className="order-1 md:order-2 p-4 md:p-0">
                            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-6">
                                {Heading}
                            </h2>
                            <div className="space-y-4 md:space-y-6">
                                {featuresList?.map((feature, index) => (
                                    <div key={index} className="flex items-center leading-relaxed">
                                        <span className="w-6 h-6 flex items-center justify-center">
                                            <CheckBox />
                                        </span>
                                        <span className="text-base md:text-lg font-semibold ml-3">{feature.featureText}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};