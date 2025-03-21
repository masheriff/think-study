'use client'
import Image from 'next/image'
import type { CallToActionBlock as CallToActionBlockType } from '@/payload-types'

type Props = CallToActionBlockType & {
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

export const CallToActionBlock: React.FC<Props> = (props) => {
    const {
        callText,
        offices,
        studentImage,
        logoImage,
    } = props

    return (
        <section className="mx-4 md:container md:mx-auto bg-gray-200 rounded-3xl">
            {/* Completely stacked layout on mobile/tablet, horizontal on desktop */}
            <div className="flex flex-col lg:flex-row">
                {/* Text content - full width on mobile/tablet, 7/12 on desktop */}
                <div className="flex flex-col w-full lg:w-6/12 justify-center items-center lg:items-start space-y-8 px-8 py-8 lg:py-0">
                    <p className="text-4xl font-mynerve text-[#FF0000] text-center lg:text-left">{callText}</p>
                    {offices?.map((office, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center gap-4">
                                <div>
                                    {office.phoneNumbers.map((phone, idx) => (
                                        <div key={idx} className="text-3xl font-medium">
                                            {phone.number}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-7xl ms-2">&#125;</div>
                                <div className="text-3xl text-[#FF0000]">{office.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logo - full width on mobile/tablet, 3/12 on desktop */}
                <div className="flex flex-col w-full lg:w-3/12 justify-center p-4">

                    {logoImage?.url && (
                        <Image
                            src={logoImage.url}
                            alt="Company Logo"
                            width={300}
                            height={80}
                            className="w-full max-w-[300px] mx-auto lg:mx-0"
                        />
                    )}
                </div>

                {/* Student image - full width on mobile/tablet, 2/12 on desktop */}
                {studentImage?.url && (
                    <div className=" w-full lg:w-3/12">
                        <div className="w-9/12 sm:w-7/12 mx-auto lg:w-full min-h-[500px] sm:min-h-[700px] lg:min-h-[500px] relative">
                            <Image
                                src={studentImage.url}
                                alt="Student"
                                fill
                                className="object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
                            />
                        </div>

                    </div>
                )}
            </div>
        </section>
    )
}

export default CallToActionBlock