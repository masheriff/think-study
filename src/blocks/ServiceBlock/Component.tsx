'use client'

import React from 'react'
import type { ServiceBlock as ServiceBlockType } from '@/payload-types'
import { DownArrow } from '../../components/thinkstudy-svg/index'

type Props = ServiceBlockType & {
    className?: string;
    downImage: string;
}

export const ServiceBlock: React.FC<Props> = (props) => {
    const {
        mainHeading,
        description,
        subDescription,
        services,
        backgroundimage,
        buttonText,
    } = props

    return (
        <div className='container'>
            <section
                className="mb-12 rounded-3xl py-12 px-4 md:px-8"
                style={{
                    backgroundColor: '#D9F1FD',
                    backgroundImage: typeof backgroundimage === 'object' && backgroundimage?.url ? `url(${backgroundimage.url})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="w-1/2 text-center mb-12 bg-white/20 backdrop-blur-lg border border-[#FFFFFF] rounded-xl p-2">
                        <h2 className="text-[#FF0000] mb-2 font-mynerve italic" style={{ fontSize: '23px' }}>
                            {mainHeading}
                        </h2>
                        <p className="mb-4 text-sm">
                            {description}
                        </p>
                        <p className="mb-8 text-sm">
                            {subDescription}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="inline-block bg-[#C1F177] px-8 py-3 rounded-xl">
                                <h3 className="text-base">
                                    {buttonText}
                                </h3>
                            </div>
                            <div className="flex flex-row items-center space-x-2 ml-4">
                                <DownArrow />
                                <DownArrow />
                                <DownArrow />
                                <DownArrow />
                            </div>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services?.map((service, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-3xl h-[300px] flex flex-col items-center justify-center bg-[#C1F177]"
                            >
                                <h4 className="text-xl text-center font-medium mb-3">
                                    {service.title}
                                </h4>
                                <p className="text-sm text-center">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServiceBlock