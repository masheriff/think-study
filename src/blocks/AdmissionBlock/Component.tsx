'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import type { AdminssionBlock as AdminssionBlockType } from '@/payload-types'
import { CurlyBraces } from '@/components/thinkstudy-svg/index'
import VerticalLineScroll from '@/components/Animation'

type Props = AdminssionBlockType & {
    className?: string
    rightImage: RightImage;
    CurlBraces: string;
    theme?: string;
}


type RightImage = {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
}

export const AdminssionBlock: React.FC<Props> = (props) => {
    const {
        className,
        year,
        description,
        day,
        currentYear,
        currentDescription,
        successRate,
        ambitions,
        statistics,
        courses,
    } = props;

    return (
        <section className={cn('', className)}>
            <div className='container'>
                <div className=" p-6 py-4 mx-auto relative flex flex-col bg-[#D9F1FD] rounded-3xl md:flex-row items-start md:items-center">
                    {/* Left Timeline */}
                    <div className="relative md:w-[50%] ms-4 my-8">
                        <div>
                            <VerticalLineScroll />
                        </div>

                        <div className="flex items-center flex-col justify-between h-[405px] w-full ms-[50px]">
                            <div className="w-full text-start ">
                                <h2>{currentYear}</h2>
                                <h3 className="text-4xl font-medium">{day}</h3>
                                <p className="italic font-light font-mynerve text-[26px] leading-none">
                                    <span>
                                        {currentDescription.split(' ')[0]}  {currentDescription.split(' ')[1]}
                                    </span>
                                </p>
                                <span
                                    className=" italic font-light font-mynerve text-[26px]">
                                    {currentDescription.slice(currentDescription.indexOf(' ') + 4)}
                                </span>

                            </div>

                            <div className="w-full  text-start ">
                                <h2 className="">{year}</h2>
                                <p className="text-4xl font-medium">
                                    <span>{description.split(' ')[0]}</span>
                                </p>
                                <p className=' italic font-light font-mynerve text-[26px]'>{description.slice(description.indexOf(' ') + 1)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:w-[70%] px-6 md:px-0 ps-[50px] ">
                        <p className="text-[#FF0000] mb-0 font-mynerve italic" style={{ fontSize: '23px' }}>{ambitions}</p>

                        <p className="text-lg font-medium max-w-[430px]">{successRate}</p>
                        <div className="mt-2 text-sm font-semibold flex flex-wrap items-center gap-1 max-w-full overflow-hidden">
                            {statistics &&
                                statistics.map((stat, index) => (
                                    <div key={index} className="text-center me-5 flex items-center gap-2 w-[120px] min-w-[100px] italic">
                                        <h3 className="text-[18px] font-bold">{stat.value}</h3>
                                        <p className="text-[18px] ">{stat.label}</p>
                                    </div>
                                ))}
                        </div>


                        {/* Courses */}
                        <div className="mt-6">
                            <div className="flex items-center gap-3 md:ms-[-46px] ms-0">
                                <div className="flex items-center gap-1 flex-col me-[10px]">
                                    <div className="text-[16px] sm:text-[20px] md:text-[25px] font-medium mb-1">We excel in</div>
                                    <div className="text-[10px] mt-0">(UG & PG)</div>
                                </div>

                                {/* <span className="text-6xl font-bold">{`{`}</span> */}
                                <div className="absolute ms-[100px] sm:ms-[155px] md:ms-[105px] lg:ms-[161px]">

                                    <CurlyBraces />
                                </div>

                                <div>
                                    {' '}
                                    <ul className="list-none mt-2 space-y-1 ps-16 ">
                                        {courses.map((course, index) => (
                                            <li key={index} className="text-[18px] sm:text-md md:text-md font-medium">
                                                {course.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminssionBlock;
