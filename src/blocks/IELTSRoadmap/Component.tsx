'use client';

import Image from 'next/image';
import type { IELTSRoadmap as IELTSRoadmapType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type Props = IELTSRoadmapType & {
    className?: string;
};

export const IELTSRoadmap: React.FC<Props> = ({
    title,
    subtitle,
    steps,
    className
}) => {
    return (
        <div className="container">
            <section
                className={cn('rounded-3xl py-6 px-4 md:px-8', className)}
                style={{
                    backgroundColor: '#D9F1FD',
                }}
            >
                <div className="w-full max-w-6xl mx-auto py-12 md:py-14">
                    {/* Heading Section */}
                    <div className="text-center mb-12 md:mb-20 max-w-5xl">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                            {title}
                            {subtitle && (
                                <span className="block text-[#FF0000] text-3xl md:text-5xl mt-2 font-mynerve italic text-end">
                                    {subtitle}
                                </span>
                            )}
                        </h2>
                    </div>

                    {/* Roadmap Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative">
                        {steps?.map((step, index) => (
                            <div key={index} className="relative flex flex-col items-center gap-6">
                                {/* Card Container */}
                                <div className="bg-[#C5FF64] rounded-2xl shadow-xl p-4 md:p-4 hover:shadow-2xl transition-all duration-300 w-[80%]">
                                    {/* Step Number */}
                                    <div className="text-4xl font-bold mb-4">
                                        {step.stepNumber}
                                    </div>

                                    {/* Icon */}
                                    {step.icon && typeof step.icon === 'object' && step.icon.url && (
                                        <div className="flex justify-end">
                                            <Image
                                                src={step.icon.url}
                                                alt={step.icon.alt || `Step ${step.stepNumber} icon`}
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Description outside the card */}
                                <p className="font-semibold whitespace-pre-line leading-relaxed text-center">
                                    {step.description}
                                </p>

                                {/* Arrow SVG between cards (except last card) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-[85px] -right-[55px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="16" viewBox="0 0 51 16" fill="none">
                                            <path d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 9H50V7H0V9Z" fill="black" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};