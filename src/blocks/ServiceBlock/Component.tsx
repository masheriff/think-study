'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import type { ServiceBlock as ServiceBlockType } from '@/payload-types'
import Image from 'next/image'
import { DownArrow } from '../../components/thinkstudy-svg/index'


type Props = ServiceBlockType & {
    className?: string
    mainHeadingStyles: mainHeadingStyles | undefined;
    descriptionStyle: descriptionStyle | undefined;
    buttonStyle: buttonStyle | undefined;
    downImage: string;
    serviceStyles: serviceStyles | undefined;
}

type mainHeadingStyles = {
    family: string;
    size: string;
    color: string;
}
type descriptionStyle = {
    family: string;
    size: string;
    color: string;
}
type buttonStyle = {
    family: string;
    size: string;
    color: string;
}
type serviceStyles = {
    family: string;
    size: string;
    color: string;
    backgroundColor: string;
}
export const ServiceBlock: React.FC<Props> = (props) => {
    const {
        className,
        mainHeading,
        mainHeadingStyles,
        description,
        subDescription,
        services,
        backgroundColor,
        backgroundimage,
        descriptionStyle,
        buttonText,
        buttonStyle,
        serviceStyles,
    } = props

    return (
        <div className='container'>
            <section
                className={cn('  mb-12 rounded-3xl py-8 px-4 md:px-8', className)}
                style={{
                    backgroundColor: backgroundColor || 'transparent',
                    backgroundImage: typeof backgroundimage === 'object' && backgroundimage?.url ? `url(${backgroundimage.url})` : 'none'
                    ,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >


                <div className="max-w-7xl mx-auto">
                    <div className="header-block max-w-2xl bg-white/20 backdrop-blur-lg border  border-[#FFFFFF] rounded-3xl p-8">


                        {/* Header Section */}
                        <div className="max-w-4xl mx-auto text-start mb-2">
                            <h2
                                className=" mb-2"
                                style={{
                                    fontFamily: mainHeadingStyles?.family,
                                    fontSize: mainHeadingStyles?.size || '1rem',
                                    color: mainHeadingStyles?.color || '#FF0000',
                                }}
                            >
                                {mainHeading}
                            </h2>
                            <p className="mb-2"
                                style={{
                                    fontFamily: descriptionStyle?.family,
                                    fontSize: descriptionStyle?.size,
                                    color: descriptionStyle?.color,
                                }}
                            >
                                {description}
                            </p>
                            <p className=""
                                style={{
                                    fontFamily: descriptionStyle?.family,
                                    fontSize: descriptionStyle?.size,
                                    color: descriptionStyle?.color,
                                }}
                            >
                                {subDescription}
                            </p>
                        </div>

                        {/* How we make it happen section */}
                        <div className="mb-2 flex items-center justify-start">
                            {/* Button */}
                            <div className="inline-block bg-[#C1F177] px-6 py-2 rounded-full">
                                <h3
                                    style={{
                                        fontFamily: buttonStyle?.family,
                                        fontSize: buttonStyle?.size,
                                        color: buttonStyle?.color || "#000000",
                                    }}
                                >
                                    {buttonText}
                                </h3>
                            </div>

                            {/* Down Arrows */}
                            <div className="flex flex-row items-center space-x-2 ms-[10px]">
                                <DownArrow />
                                <DownArrow />
                                <DownArrow />
                                <DownArrow />
                            </div>
                        </div>

                    </div>


                    {/* Services Grid */}
                    <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {services?.map((service, index) => (
                            <div
                                key={index}

                                className=" p-4  py-[100px] rounded-3xl h-full flex flex-col align-center justify-center"
                                style={{
                                    backgroundColor: serviceStyles?.backgroundColor || '#C1F177',
                                }}
                            >

                                <h4 className="text-[18px] text-center font-medium mb-1"
                                    style={{
                                        // fontFamily: serviceStyles?.family,
                                        // fontSize: serviceStyles?.size,
                                        // color: serviceStyles?.color,
                                    }}
                                >{service.title}</h4>
                                <p className="text-sm flex-grow text-center"
                                    style={{
                                        fontFamily: serviceStyles?.family,
                                        fontSize: serviceStyles?.size,
                                        color: serviceStyles?.color,
                                    }}
                                >{service.description}</p>

                            </div>
                        ))}
                    </div>

                </div>
            </section></div>

    )
}

export default ServiceBlock