'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { AdminssionBlock as AdminssionBlockType } from '@/payload-types'
import CurlBraces from '../../../public/CurlBraces.png'
import 'aos/dist/aos.css';
import VerticalLineScroll from '@/components/Animation'

type Props = AdminssionBlockType & {
    className?: string
    yearStyles: YearStyle[] | undefined;
    currentStyles: CurrentStyles[] | undefined;
    rightImage: RightImage;
    CurlBraces: string;
    theme?: string;
}

type YearStyle = {
    Family: string;
    Size: string;
    Color: string;
};

type CurrentStyles = {
    Family: string;
    Size: string;
    Color: string;
};

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
        textStyles,
        yearStyles,
        currentStyles,
        rightImage,
    } = props;

    // const [isVisible, setIsVisible] = useState(false);

    // useEffect(() => {
    //     setIsVisible(true);
    // }, []);

    return (
        <section className={cn('py-10   md:px-12', className, textStyles)}>
            <div className=" max-w-6xl p-6 py-4 mx-auto relative flex flex-col bg-[#D9F1FD] rounded-3xl md:flex-row items-start md:items-center">
                {/* Left Timeline */}
                <div className="relative md:w-1/3 my-8">
                    <div >
                        <VerticalLineScroll />
                    </div>

                    <div className="flex items-center flex-col justify-between h-[405px] w-full ms-[50px]">
                        <div className="w-full text-start ">
                            <h2
                                style={{
                                    color: yearStyles?.[0]?.Color,
                                    fontSize: yearStyles?.[0]?.Size,
                                    fontFamily: yearStyles?.[0]?.Family,
                                }}
                            >
                                {currentYear}
                            </h2>

                            <h3 className="text-4xl font-medium">{day}</h3>

                            <p className="italic text-lg font-medium leading-tight m-0 p-0 font-allura">
                                <span
                                    style={{
                                        color: currentStyles?.[0]?.Color,
                                        fontSize: currentStyles?.[0]?.Size,
                                        // fontFamily: currentStyles?.[0]?.Family,
                                    }}
                                >
                                    {currentDescription.split(' ')[0]} &nbsp;{currentDescription.split(' ')[1]}
                                </span>
                            </p>
                            <span
                                className="italic font-medium leading-tight m-0 p-0 font-allura"
                                style={{
                                    color: currentStyles?.[0]?.Color,
                                    fontSize: currentStyles?.[0]?.Size,
                                    // fontFamily: currentStyles?.[0]?.Family,
                                }}
                            >
                                {currentDescription.slice(currentDescription.indexOf(' ') + 4)}
                            </span>

                        </div>

                        <div className="w-full  text-start ">
                            <h2 className="">{year}</h2>
                            <p className="text-4xl font-medium">
                                <span >{description.split(' ')[0]}</span>
                            </p>
                            <p className=' italic font-light font-Delius text-[26px]'>{description.slice(description.indexOf(' ') + 1)}</p>
                        </div>
                    </div>


                </div>

                {/* Right Content */}
                <div className="md:w-2/3 px-6 md:px-0 ps-[50px] md:ps-[160px]">
                    <p className="text-xl text-[#ff0000] italic mb-0 italic font-Delius" >{ambitions}</p>
                    <p className="text-md font-normal max-w-[430px]">{successRate}</p>
                    <div className="mt-2 text-sm font-semibold flex flex-wrap items-center gap-1 max-w-full overflow-hidden">
                        {statistics &&
                            statistics.map((stat, index) => (
                                <div key={index} className="text-center flex items-center gap-2 w-[120px] min-w-[100px]">
                                    <h3 className="text-md font-bold">{stat.value}</h3>
                                    <p className="text-sm">{stat.label}</p>
                                </div>
                            ))}
                    </div>


                    {/* Courses */}
                    <div className="mt-6">
                        <div className="flex items-center gap-3 md:ms-[-46px] ms-0">
                            <div className="flex items-center gap-1 flex-col me-[10px]">
                                <div className="text-[16px] sm:text-[20px] md:text-[25px] font-medium mb-[-10px]">We excel in</div>
                                <div className="text-[10px] mt-0">(UG & PG)</div>
                            </div>

                            {/* <span className="text-6xl font-bold">{`{`}</span> */}
                            <div className="absolute ms-[100px] sm:ms-[155px] md:ms-[105px] lg:ms-[170px]">
                                {rightImage?.url && (
                                    <Image
                                        src={CurlBraces}
                                        alt="CurlBraces"
                                        width={0}
                                        height={0}
                                        className="w-[30px] h-full object-cover"
                                    />
                                )}
                            </div>

                            <div>
                                {' '}
                                <ul className="list-none mt-2 space-y-1 ps-16 ">
                                    {courses.map((course, index) => (
                                        <li key={index} className="text-sm sm:text-md md:text-md font-medium">
                                            {course.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminssionBlock;
