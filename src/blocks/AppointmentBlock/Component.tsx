'use client'
import React from 'react'
import type { AppointmentBlock as AppointmentBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { CheckBox } from '@/components/thinkstudy-svg'
import { Button } from '@/components/ui/button'

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

    // Get fromDate and toDate if they exist
    const fromDateFormatted = right?.schedule?.fromDate ? formatDate(right.schedule.fromDate) : { day: '', month: '', year: '' }
    const toDateFormatted = right?.schedule?.toDate ? formatDate(right.schedule.toDate) : null

    // Function to format date range display
    const getDateRangeDisplay = () => {
        if (!toDateFormatted) {
            // If no toDate, show just the fromDate
            return {
                dayDisplay: fromDateFormatted.day,
                dateDisplay: `${fromDateFormatted.month} ${fromDateFormatted.year}`
            }
        } else {
            // If dates are in the same month and year
            if (fromDateFormatted.month === toDateFormatted.month && fromDateFormatted.year === toDateFormatted.year) {
                return {
                    dayDisplay: `${fromDateFormatted.day}-${toDateFormatted.day}`,
                    dateDisplay: `${fromDateFormatted.month} ${fromDateFormatted.year}`
                }
            }
            // If dates are in the same year but different months
            else if (fromDateFormatted.year === toDateFormatted.year) {
                return {
                    dayDisplay: `${fromDateFormatted.day}-${toDateFormatted.day}`,
                    dateDisplay: `${fromDateFormatted.month}-${toDateFormatted.month} ${fromDateFormatted.year}`
                }
            }
            // If dates are in different years
            else {
                return {
                    dayDisplay: `${fromDateFormatted.day}-${toDateFormatted.day}`,
                    dateDisplay: `${fromDateFormatted.month} ${fromDateFormatted.year} - ${toDateFormatted.month} ${toDateFormatted.year}`
                }
            }
        }
    }

    const { dayDisplay, dateDisplay } = right?.schedule ? getDateRangeDisplay() : { dayDisplay: '', dateDisplay: '' }

    return (
        <section className={cn("my-8", className)}>
            <div className="container bg-[#D9F1FD] p-16 rounded-2xl">
                <div className="flex md:flex-row flex-col align-items-center justify-between space-x-20">
                    <div className="flex flex-col w-1/2 space-y-6">
                        <h6 className="text-xl font-medium text-black/65">{leftContent?.title}</h6>
                        <h2 className="text-4xl font-semibold text-gray-700">{leftContent?.subTitle}</h2>
                        <p className="text-3xl text-[#FF0000] font-mynerve italic mb-4 font-semibold">{leftContent?.highlightText}</p>
                        <p className="text-base text-black/65">{leftContent?.extraText}</p>
                        <div>
                            {leftContent?.paragraphs?.map((para, index) => (
                                <p key={index} className="text-black/65 text-base flex items-center leading-relaxed" >
                                    <span className="w-6 h-6 flex items-center justify-center">
                                        <CheckBox />
                                    </span>
                                    <span className='ml-2'>{para.text}</span>
                                </p>
                            ))}
                        </div>
                        <div className="block">
                            {leftContent?.button && (
                                <Button
                                    className="bg-[#6B5BA9] hover:bg-[#574A8C] hover:text-white text-white px-4 py-2 rounded-3xl transition-colors mb-3"
                                >
                                    <a href={leftContent.button.url}>{leftContent.button.text}</a>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 h-full my-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            {right?.schedule && (
                                <div className="bg-[#C1F177] rounded-2xl p-6 shadow-lg flex flex-col justify-between aspect-square">
                                    <div className="text-center">
                                        <div className="text-[7rem] leading-[1] font-semibold">{dayDisplay}</div>
                                        <div className="text-lg font-medium">{dateDisplay}</div>
                                    </div>
                                    <hr className="border-gray-800 my-2" />
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
                            {right?.universities && (
                                <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col aspect-square">
                                    <h3 className="text-md text-center font-bold mb-2">Participating Universities</h3>
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
                </div>
                <div className="text-right text-sm text-gray-600">{bottomText}</div>
            </div>
        </section>
    )
}

export default AppointmentBlock