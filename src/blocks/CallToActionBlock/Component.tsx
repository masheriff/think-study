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



    // const handleScroll = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // };

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 100) {
    //             setShowButton(true);
    //         } else {
    //             setShowButton(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    // console.log(officeStyles, "officeStyles")

    return (
        <section className="container">
            <div className="space-y-12">
                <div className="relative">
                    <div className="bg-gray-200 rounded-3xl px-8 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Left Side - Contact Info */}
                            <div className="space-y-8">
                                <p className="text-xl font-fuzzyBubbles text-[#FF0000]">{callText}</p>

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
                                                className="text-xl text-[#FF0000]">{office.name}</div>
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

export default CallToActionBlock