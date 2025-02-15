'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { FutureBlock as FutureBlockType } from '@/payload-types'

type Props = FutureBlockType & {
    className?: string
    headingStyles?: TextStyle[]
    connectStyles?: TextStyle[]
    officeStyles?: TextStyle[]
    studentImage: MediaType
    logoImage: MediaType
}

type TextStyle = {
    family: string
    size: string
    color: string
}

type MediaType = {
    url?: string
    alt?: string
    width?: number
    height?: number
}

export const FutureBlock: React.FC<Props> = (props) => {
    const {
        className,
        mainHeading,
        connectText,
        buttonText,
        callText,
        offices,
        headingStyles,
        connectStyles,
        officeStyles,
        studentImage,
        logoImage,
    } = props

    console.log(headingStyles, "officeStyles")

    return (
        <section className={cn('py-16 px-6 md:px-12', className)}>
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Top Section */}
                <div className="text-center space-y-6">
                    <h1
                        className="text-4xl md:text-5xl"
                        style={{
                            color: headingStyles?.[0]?.color || '#000000',
                            fontSize: headingStyles?.[0]?.size || '2.5rem',
                            fontFamily: headingStyles?.[0]?.family,
                        }}
                    >
                        {mainHeading}
                    </h1>

                    <p
                        className="text-2xl md:text-3xl italic"
                        style={{
                            color: connectStyles?.[0]?.color || '#FF0000',
                            fontSize: connectStyles?.[0]?.size || '1.875rem',
                            fontFamily: connectStyles?.[0]?.family,
                        }}
                    >
                        {connectText}
                    </p>

                    <button className="bg-[#574B9B] text-white px-8 py-3 rounded-full text-sm">
                        {buttonText}
                    </button>
                </div>

                {/* Bottom Section */}
                <div className="bg-gray-100 rounded-3xl px-8 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Side - Contact Info */}
                        <div className="space-y-8">
                            <p className="text-xl italic text-red-500">{callText}</p>

                            {offices?.map((office, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            {office.phoneNumbers.map((phone, idx) => (
                                                <div key={idx} className="text-xl font-medium">
                                                    {phone.number}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-5xl ms-2">&#125;</div>
                                        <div
                                            className="text-xl"
                                            style={{
                                                color: officeStyles?.[0]?.color || '#000000',
                                                fontSize: officeStyles?.[0]?.size || '1.25rem',
                                                fontFamily: officeStyles?.[0]?.family,
                                            }}
                                        >
                                            {office.name}
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>

                        {/* Right Side - Student Image */}
                        <div className="relative">
                            <div className='absolute top-[67px] right-[220px]'>
                                {logoImage?.url && (
                                    <div className="mt-6">
                                        <Image
                                            src={logoImage.url}
                                            alt="Company Logo"
                                            width={300}
                                            height={80}
                                            className=""
                                        />
                                    </div>
                                )}</div>
                            {studentImage?.url && (
                                <Image
                                    src={studentImage.url}
                                    alt="Student"
                                    width={400}
                                    height={500}
                                    className="w-full h-auto rounded-2xl z-10 relative"
                                    priority
                                />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FutureBlock