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
        <div className="container">
            <section
                className={cn('rounded-3xl pt-12 px-4 md:px-8', className)}
                style={{
                    backgroundColor: '#D9F1FD',
                    backgroundImage: typeof backgroundImage === 'object' && backgroundImage?.url ? `url(${backgroundImage.url})` : 'none',
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="w-full max-w-6xl mx-auto py-12 md:py-20">
                    {/* Heading Section */}
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="flex text-3xl md:text-5xl font-bold leading-tight mb-4">
                            <span className="block">{normalHeading}</span>
                            <span className="text-[#FF0000] font-mynerve italic">{highlightedHeading}</span>
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            <TextHighlightBold text={normalDescription} />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Left Content Card */}
                        <div className="bg-[#C5FF64] rounded-2xl shadow-xl p-8 md:p-10">
                            <div className="prose-lg text-gray-800 space-y-6">
                                <TextHighlightBold text={contentCard} />
                            </div>
                        </div>

                        {/* Right Content Card */}
                        <div className="bg-[#C5FF64] rounded-2xl shadow-xl p-8 md:p-10">
                            <div className="space-y-8">
                                {iconCards?.map((card, index) => (
                                    <div key={index} className="flex items-start">
                                        {card.icon && typeof card.icon === 'object' && card.icon.url && (
                                            <div className="mr-2">
                                                <Image
                                                    src={card.icon.url}
                                                    alt={card.icon.alt || card.icon.filename || ""}
                                                    width={40}
                                                    height={40}
                                                    className="text-red-600"
                                                />
                                            </div>
                                        )}
                                        <p className="text-lg text-gray-800 leading-relaxed">
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