'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

import type { ContactUsBlock as ContactUsBlockType } from '@/payload-types'
import { FormBlock } from '../Form/Component'
import { Form } from '@payloadcms/plugin-form-builder/types'

type Props = ContactUsBlockType & {
    className?: string
}

export const ContactUsBlock: React.FC<Props> = (props) => {
    const { heading, description, form } = props;
    return (
        <section
            className="container"
            aria-labelledby="contact-us-block"
        >
            <div
                className="p-4 md:p-6 mx-auto grid grid-cols-1 lg:grid-cols-12 bg-[#D9F1FD] rounded-3xl items-start md:items-center"
                aria-label="contact-us-container"
            >
                <div className='flex flex-col h-full items-center justify-center py-20 lg:py-0 col-span-7'>
                    <h2
                        id="contact-us-block"
                        className="text-[50px] md:text-[60px] lg:text-[100px] text-[#000000] text-center lg:text-left font-montserrat font-bold leading-none w-full lg:max-w-lg mb-4 lg:mb-8"
                    >
                        {heading}
                    </h2>
                    <p className='text-base md:text-lg text-[#333333]  text-center lg:text-left w-full lg:max-w-lg'>
                        {description}
                    </p>
                </div>
                <div className='flex flex-col h-full col-span-5'>
                    <FormBlock
                        enableIntro={false}
                        form={form as unknown as Form}
                    />
                </div>
            </div>

        </section>
    );
}