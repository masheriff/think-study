'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { CallActionBlock as CallActionBlockType } from '@/payload-types'


type Props = CallActionBlockType & {
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

export const CallActionBlock: React.FC<Props> = (props) => {
    const {
        className,
        callText,
        offices,
        officeStyles,
        studentImage,
        logoImage,
    } = props

    const [showButton, setShowButton] = useState(false);


    // const handleScroll = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // console.log(officeStyles, "officeStyles")

    return (
        <section className={cn('container', className)}>
            <div className="space-y-12">
                <div className="relative">
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
                                                    color: officeStyles?.[0]?.color || '#FF0000',
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



            </div>

        </section>
    )
}

export default CallActionBlock