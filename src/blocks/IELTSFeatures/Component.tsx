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
        <div className="container">
            <section className={cn('bg-[#D9F1FD] rounded-3xl py-12 px-4 md:px-8', className)}>
                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Side: Features List */}
                        <div className="flex justify-start">
                            {studentImage && typeof studentImage === 'object' && studentImage?.url && (
                                <Image
                                    src={studentImage.url}
                                    alt={studentImage.alt || "IELTS Student"}
                                    width={400}
                                    height={500}
                                    className="rounded-xl shadow-xl bg-[#C1F177]"
                                />
                            )}
                        </div>

                        {/* Right Side: Student Image */}
                        {/* Heading Section */}
                        <div className="mb-12 md:mb-20">
                            <h2 className="text-3xl md:text-3xl font-bold leading-tight mb-4">
                                {Heading}
                            </h2>
                            <div className="space-y-6">
                                {featuresList?.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <CheckBox />
                                        <span className="text-lg font-medium ml-2">{feature.featureText}</span>
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