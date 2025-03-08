'use client'
import React, { useEffect, useState } from 'react'
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
    const [dateError, setDateError] = useState<string | null>(null)

    // Format the schedule date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'long' })
        const year = date.getFullYear()
        return { day, month, year, date }
    }

    // Get fromDate and toDate if they exist
    const fromDateFormatted = right?.schedule?.fromDate ? formatDate(right.schedule.fromDate) : { day: '', month: '', year: '', date: null }
    const toDateFormatted = right?.schedule?.toDate ? formatDate(right.schedule.toDate) : null

    // Validate dates
    useEffect(() => {
        if (fromDateFormatted.date && toDateFormatted?.date) {
            if (fromDateFormatted.date > toDateFormatted.date) {
                setDateError("Error: 'To Date' must be greater than 'From Date'")
            } else {
                setDateError(null)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [right?.schedule?.fromDate, right?.schedule?.toDate])

    // Function to format date range display
    const getDateRangeDisplay = () => {
        if (!toDateFormatted) {
            // If no toDate, show just the fromDate
            return {
                hasBothDates: false,
                fromDay: fromDateFormatted.day,
                fromMonth: fromDateFormatted.month,
                fromYear: fromDateFormatted.year,
                toDay: '',
                toMonth: '',
                toYear: '',
                dateDisplay: `${fromDateFormatted.month} ${fromDateFormatted.year}`
            }
        } else {
            // If has both dates, return separate parts for formatting
            return {
                hasBothDates: true,
                fromDay: fromDateFormatted.day,
                fromMonth: fromDateFormatted.month,
                fromYear: fromDateFormatted.year,
                toDay: toDateFormatted.day,
                toMonth: toDateFormatted.month,
                toYear: toDateFormatted.year,
                dateDisplay: '' // Not used when we have both dates
            }
        }
    }

    const dateInfo = right?.schedule ? getDateRangeDisplay() : {
        hasBothDates: false,
        fromDay: '',
        fromMonth: '',
        fromYear: '',
        toDay: '',
        toMonth: '',
        toYear: '',
        dateDisplay: ''
    }

    // Determine if day should be shown (only when there's no toDate)
    const shouldShowDay = right?.schedule?.fromDate && !right?.schedule?.toDate

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
                                    {dateError && (
                                        <div className="text-red-600 text-sm font-medium mb-2 text-center">
                                            {dateError}
                                        </div>
                                    )}
                                    {!dateInfo.hasBothDates ? (
                                        // Single date display
                                        <div className="text-center">
                                            <div className="text-[7rem] leading-[1] font-semibold">{dateInfo.fromDay}</div>
                                            <div className="text-lg font-medium">{dateInfo.dateDisplay}</div>
                                        </div>
                                    ) : (
                                        // Date range display
                                        <div className="text-center">
                                            <div className="flex justify-between items-center ">
                                                <div className="w-5/12 text-center">
                                                    <div className="text-7xl font-semibold">{dateInfo.fromDay}</div>
                                                    <div className="text-lg font-medium">{dateInfo.fromMonth}</div>
                                                    <div className="text-lg font-medium">{dateInfo.fromYear}</div>
                                                </div>
                                                <div className="w-2/12 text-center font-bold">—</div>
                                                <div className="w-5/12 text-center">
                                                    <div className="text-7xl font-semibold">{dateInfo.toDay}</div>
                                                    <div className="text-lg font-medium">{dateInfo.toMonth}</div>
                                                    <div className="text-lg font-medium">{dateInfo.toYear}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <hr className="border-gray-800 my-2" />
                                    {dateInfo.hasBothDates ? (
                                        // Centered slots when date range exists
                                        <div className="flex justify-center items-center px-2">
                                            <div className="text-center">
                                                {right.schedule.slots?.slice(0, 2).map((slot, index) => (
                                                    <p key={index} className="text-sm">{slot.time}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        // Original layout with day and right-aligned slots
                                        <div className="flex justify-evenly items-center px-2">
                                            {shouldShowDay && (
                                                <span className="text-sm font-semibold">
                                                    {right.schedule.day}
                                                </span>
                                            )}
                                            <div className="text-right">
                                                {right.schedule.slots?.slice(0, 2).map((slot, index) => (
                                                    <p key={index} className="text-sm">{slot.time}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {right?.universities && (
                                <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col aspect-square">
                                    <h3 className="text-md text-center font-bold mb-2">
                                        {right.uniHeading || 'Participating Universities'}
                                    </h3>
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