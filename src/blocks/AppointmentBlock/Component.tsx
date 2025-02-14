'use client'
import React from 'react'
import type { AppointmentBlock as AppointmentBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'

type Props = AppointmentBlockType & {
    className?: string
}

const AppointmentBlock: React.FC<Props> = (props) => {
    const { className, leftContent, right, bottomText } = props

    // Format the schedule date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'long' })
        const year = date.getFullYear()
        return { day, month, year }
    }
    const { day, month, year } = right?.schedule ? formatDate(right.schedule.date) : { day: '', month: '', year: '' }

    return (
        <section className={cn("my-8", className)}>
            <div className="container bg-cyan-100 p-6 mx-auto rounded-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Section */}
                    <div className="space-y-8">
                        <div className="ml-4">
                            <h6 className="text-2xl mb-1 text-gray-800">{leftContent?.title}</h6>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">{leftContent?.subTitle}</h2>
                            <p className="text-xl font-bold italic text-red-600">{leftContent?.highlightText}</p>
                            {/* New extraText field */}
                            <p className="text-lg text-gray-700 mt-2">{leftContent?.extraText}</p>
                        </div>
                        <div className="ml-4">
                            {leftContent?.paragraphs?.map((para, index) => (
                                <p key={index} className="text-gray-700 text-lg flex items-center ml-8">
                                    <Image src="/media/icons/square.png" alt="checkbox" width={20} height={20} className="mr-2" />
                                    {para.text}
                                </p>
                            ))}
                        </div>
                        {leftContent?.button && (
                            <Link
                                href={leftContent.button.url}
                                className="inline-block bg-purple-800 hover:bg-purple-900 text-white p-3 rounded-full text-base font-semibold mt-6 ml-8"
                            >
                                {leftContent.button.text}
                            </Link>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full py-20">
                        {/* Schedule Card */}
                        {right?.schedule && (
                            <div className="bg-lime-300 rounded-2xl p-6 shadow-lg flex flex-col justify-between aspect-square">
                                <div className="text-center my-auto">
                                    <div className="text-9xl font-semibold mb-2">{day}</div>
                                    <div className="text-lg font-medium mb-2">{month} {year}</div>
                                    <hr className="border-gray-800 mb-2" />
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-sm font-semibold">{right.schedule.day}</span>
                                    <div className="text-right">
                                        {right.schedule.slots && right.schedule.slots.length > 0 && (
                                            <p className="text-sm">{right.schedule.slots?.[0]?.time}</p>
                                        )}
                                        {right.schedule.slots && right.schedule.slots.length > 1 && (
                                            <p className="text-sm">{right.schedule.slots?.[1]?.time}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Universities Card */}
                        {right?.universities && (
                            <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col aspect-square">
                                <h3 className="text-lg text-center font-bold mb-2">Participating Universities</h3>
                                <div className="flex flex-col justify-center items-center space-y-4 flex-grow">
                                    {right.universities.map((uni, index) => (
                                        typeof uni.img !== 'number' && uni.img && (
                                            <div key={index} className="rounded-lg flex items-center justify-center w-fit">
                                                <Image
                                                    src={uni.img.url || ""}
                                                    alt={uni.alt || ""}
                                                    width={150}
                                                    height={50}
                                                    className="object-contain"
                                                />
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Bottom Text */}
                <div className="text-right text-sm text-gray-600">{bottomText}</div>
            </div>
        </section>
    )
}

export default AppointmentBlock
