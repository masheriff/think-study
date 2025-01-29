import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import type { CounselingBlock as CounselingBlockType } from '@/payload-types'

type Props = CounselingBlockType & {
    className?: string
}

export const CounselingBlock: React.FC<Props> = (props) => {
    const { className, heading, description, button, backgroundImage, card } = props

    return (
        <section className={cn('relative', className)}>
            {/* Top Content */}
            <div className="container px-4 py-12 flex flex-col items-start">
                <h6 className="text-2xl mb-6 text-gray-800">{heading}</h6>
                <div className="w-1/2">
                    <p className="text-lg text-gray-600">{description}</p>
                </div>
                {button && (
                    <Link
                        href={button.url}
                        className="inline-block bg-violet-600 text-white px-12 py-4 rounded-3xl font-medium hover:bg-violet-700 transition-colors mt-4"
                    >
                        {button.text}
                    </Link>
                )}
            </div>

            {/* Background Image Section */}
            <div className="relative w-3/4 h-[500px] mx-auto">
                {typeof backgroundImage !== 'number' && backgroundImage && (
                    <Image
                        src={backgroundImage.url || ''}
                        alt="Background"
                        fill
                        className="object-fill rounded-2xl"
                    />
                )}

                {/* Overlay Card */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-8 shadow-xl w-[40%] h-60 mx-4 relative">
                        {typeof card.icon !== 'number' && card.icon && (
                            <div className="absolute top-[2px] left-1/2 transform -translate-x-1/2 p-1 rounded-full bg-lime-400 w-12 h-12">
                                <Image
                                    src={card.icon.url || ''}
                                    alt="Icon"
                                    width={40}
                                    height={40}
                                    className="p-1"
                                />
                            </div>
                        )}
                        <div className="flex flex-col items-center justify-center mt-8">
                            <h3 className="text-base font-light mb-2">{card.title}</h3>
                            <p className="text-black-600 font-semibold mb-2">{card.courseName}</p>
                            <div className='flex flex-row justify-center items-center gap-2 p-2 rounded-2xl border border-gray-500'>
                                {card.countries?.map((country, index) => (
                                    <p key={index} className="text-gray-600 text-sm">
                                        {country.name}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {typeof card.cardImage !== 'number' && card.cardImage && (
                            <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-32 h-32 mb-6">
                                <Image
                                    src={card.cardImage.url || ''}
                                    alt="Card Image"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CounselingBlock