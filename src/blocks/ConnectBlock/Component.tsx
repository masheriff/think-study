'use client'

import React from 'react'
import type { ConnectBlock as ConnectBlockType } from '@/payload-types'
import { transformLinkProps } from '@/utilities/transformLinkProps';
import { CMSLink } from '@/components/Link';

type Props = ConnectBlockType & {
    className?: string
    studentImage: MediaType
    logoImage: MediaType
}

type MediaType = {
    url?: string
    alt?: string
    width?: number
    height?: number
}

export const ConnectBlock: React.FC<Props> = (props) => {
    const {
        mainHeading,
        connectText,
        link,
    } = props


    return (
        <section className="container">
            <div className="max-w-7xl mx-auto space-y-12">
                <div>   {/* Top Section */}
                    <div className="text-center space-y-6 mb-16">
                        <h1
                            className="text-4xl md:text-5xl"
                            style={{
                                color: '#000000',
                                fontSize: '26px',
                            }}
                        >
                            {mainHeading}
                        </h1>

                        <p className="text-3xl md:text-[42px] text-[#FF0000] font-mynerve font-semibold">
                            {connectText}
                        </p>
                        <CMSLink
                            {...transformLinkProps(link)}
                            appearance="themeRound"
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ConnectBlock