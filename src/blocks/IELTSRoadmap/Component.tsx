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
                    <div className="text-center mb-12 md:mb-20 max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                            {title}
                            {subtitle && (
                                <span className="block text-[#FF0000] text-3xl md:text-5xl mt-2 font-mynerve italic text-center md:text-end">
                                    {subtitle}
                                </span>
                            )}
                        </h2>
                    </div>

                    {/* Mobile/Tablet Roadmap Steps */}
                    <div className="md:hidden flex flex-col gap-10 relative">
                        {steps?.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Card Container and Description - Side by Side on Mobile/Tablet */}
                                <div className={`flex flex-row items-center gap-4 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                                    {/* Card Container */}
                                    <div className="bg-[#C1F177] rounded-2xl shadow-xl p-4 flex-shrink-0 w-1/3 hover:shadow-2xl transition-all duration-300">
                                        {/* Step Number */}
                                        <div className="text-3xl font-bold mb-4">
                                            {step.stepNumber}
                                        </div>

                                        {/* Icon */}
                                        {step.icon && typeof step.icon === 'object' && step.icon.url && (
                                            <div className="flex justify-end">
                                                <Image
                                                    src={step.icon.url}
                                                    alt={step.icon.alt || `Step ${step.stepNumber} icon`}
                                                    width={60}
                                                    height={60}
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Description beside the card */}
                                    <p className="font-semibold whitespace-pre-line leading-relaxed flex-grow">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow SVG beneath each step (except last step) */}
                                {index < steps.length - 1 && (
                                    <div className="flex justify-center my-6">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="51"
                                            viewBox="0 0 16 51"
                                            fill="none"
                                            className="transform rotate-0"
                                        >
                                            <path d="M8.70711 50.7071C8.31658 51.0976 7.68342 51.0976 7.29289 50.7071L0.928932 44.3431C0.538408 43.9526 0.538408 43.3195 0.928932 42.9289C1.31946 42.5384 1.95262 42.5384 2.34315 42.9289L8 48.5858L13.6569 42.9289C14.0474 42.5384 14.6805 42.5384 15.0711 42.9289C15.4616 43.3195 15.4616 43.9526 15.0711 44.3431L8.70711 50.7071ZM9 0V50H7V0H9Z" fill="#FF0000" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Roadmap Steps (Original Layout) */}
                    <div className="hidden md:grid md:grid-cols-4 gap-8 md:gap-12 relative">
                        {steps?.map((step, index) => (
                            <div key={index} className="relative flex flex-col items-center gap-6">
                                {/* Card Container */}
                                <div className="bg-[#C1F177] rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300 w-[80%]">
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
                                    <div className="absolute top-[85px] -right-[55px]">
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