'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { FutureBlock as FutureBlockType } from '@/payload-types'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

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

    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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


    return (
        <section className={cn('py-16 px-6 md:px-12', className)}>
            <div data-aos="fade-right" className="max-w-6xl mx-auto space-y-12">
                <div>   {/* Top Section */}
                    <div className="text-center space-y-6 mb-16">
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

                        <button className="bg-[#65558F] text-white px-8 py-3 rounded-full text-sm">
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
                    </div></div>
                {showButton && ( // Conditionally render the button
                    <button
                        className="fixed bottom-4 right-4 bg-gray-200 rounded-full p-2 cursor-pointer shadow-lg"
                        onClick={handleScroll}
                        aria-label="Scroll to Top"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                )}

            </div>

        </section>
    )
}

export default FutureBlock