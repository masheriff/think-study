'use client';

import { CheckBox } from '@/components/thinkstudy-svg';
import TextHighlightBold from '@/components/ui/texthighlightbold';
import type { IELTSPackages as IELTSPackagesType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type Props = IELTSPackagesType & {
    className?: string;
};

export const IELTSPackages: React.FC<Props> = ({
    mainHeading,
    higlightedHeading,
    description,
    currencyLabel,
    enrollButtonText,
    packages,
    className,
}) => {
    const colorMap = {
        green: 'bg-[#C1F177]',
        yellow: 'bg-[#FBBC05]'
    };

    return (
        <div className="container">
            <section className={cn('rounded-3xl py-2 px-2 md:px-4 bg-[#D9F1FD]', className)}>
                <div className="max-w-6xl mx-auto py-8 md:py-10">
                    {/* Heading Section - Modified for separate lines on mobile/tablet */}
                    <div className="text-center mb-12 md:mb-14">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                            {mainHeading}
                            <br className="md:hidden" /> {/* Line break on mobile only */}
                            <span className="text-[#FF0000] font-mynerve italic">{higlightedHeading}</span>
                        </h2>
                        <p><TextHighlightBold text={description} /></p>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages?.map((pkg, index) => (
                            <div
                                key={index}
                                className={`${colorMap[pkg.packageColor]} rounded-3xl p-6 flex flex-col`}
                            >
                                <div className='p-2 rounded-2xl bg-[#D9F1FD] mb-6'>
                                    <p className="text-3xl font-bold font-mynerve italic text-center mb-2 text-[#FF0000]">
                                        {pkg.optionLabel}
                                    </p>
                                    <h3 className="text-2xl font-bold mb-4 text-center">{pkg.packageTitle}</h3>
                                </div>

                                <div className="space-y-3 mb-6 flex-grow">
                                    {pkg.details?.map((detail, idx) => (
                                        <p key={idx} className="text-lg">
                                            <strong>{detail.label}:</strong> {detail.text}
                                        </p>
                                    ))}

                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2">{pkg.includesHeading}</h4>
                                        {pkg.includes?.map((include, idx) => (
                                            <div key={idx} className="flex leading-snug">
                                                <span className="w-6 h-6 flex items-center mr-2">
                                                    <CheckBox />
                                                </span>
                                                <p>{include.includeItem}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center mt-auto">
                                    <p className="text-3xl font-bold mb-4">
                                        {currencyLabel} {pkg.price.toLocaleString()}/-
                                    </p>
                                    <button className="bg-[#6B5BA9] hover:bg-[#574A8C] text-white px-8 py-2 rounded-full transition-colors">
                                        {enrollButtonText}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};