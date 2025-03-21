'use client';

import TextHighlightBold from '@/components/ui/texthighlightbold';
import type { IELTSPrep as IELTSPrepType } from '@/payload-types';
import { cn } from '@/utilities/ui';
import Image from 'next/image';

type Props = IELTSPrepType & {
    className?: string;
};

export const IELTSPrep: React.FC<Props> = ({
    highlightedHeading,
    normalHeading,
    normalDescription,
    contentCard,
    iconCards,
    backgroundImage,
    className,
}) => {
    return (
        <div className="container px-4 md:px-6 lg:px-8">
            <section
                className={cn('rounded-3xl py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12', className)}
                style={{
                    backgroundColor: '#D9F1FD',
                    backgroundImage: typeof backgroundImage === 'object' && backgroundImage?.url ? `url(${backgroundImage.url})` : 'none',
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="w-full max-w-6xl mx-auto">
                    {/* Heading Section */}
                    <div className="text-center mb-8 md:mb-12 lg:mb-16">
                        <h2 className="flex flex-col md:flex-col lg:flex-row text-center justify-center items-center text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            <span className="block mb-2 lg:mb-0">{normalHeading}</span>
                            <span className="text-[#FF0000] font-mynerve italic">{highlightedHeading}</span>
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                            <TextHighlightBold text={normalDescription} />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                        {/* Left Content Card - Order 2 on mobile/tablet, 1 on desktop */}
                        <div className="bg-[#C1F177] rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 order-2 md:order-1">
                            <div className="prose-lg text-gray-800 space-y-4 md:space-y-6">
                                <TextHighlightBold text={contentCard} />
                            </div>
                        </div>

                        {/* Right Content Card - Order 1 on mobile/tablet, 2 on desktop */}
                        <div className="bg-[#C1F177] rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 order-1 md:order-2">
                            <div className="space-y-6 md:space-y-8">
                                {iconCards?.map((card, index) => (
                                    <div key={index} className="flex items-start">
                                        {card.icon && typeof card.icon === 'object' && card.icon.url && (
                                            <div className="mr-3 flex-shrink-0">
                                                <Image
                                                    src={card.icon.url}
                                                    alt={card.icon.alt || card.icon.filename || ""}
                                                    width={40}
                                                    height={40}
                                                    className="text-[#FF0000]"
                                                />
                                            </div>
                                        )}
                                        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                                            <TextHighlightBold text={card.text} />
                                        </p>
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