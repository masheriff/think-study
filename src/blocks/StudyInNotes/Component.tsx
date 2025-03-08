'use client'

import React from 'react';
import type { StudyInNotes as StudyInNotesType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type Props = StudyInNotesType & {
    className?: string;
};

export const StudyInNotes: React.FC<Props> = ({
    title,
    subtitle,
    intakeheader,
    intakeTable,
    expensesTable,
    inTaketableHeader,
    righttableheader,
    livingTable,
    className,
}) => {

    return (
        <section className={cn('container ', className)} >
            <div className="flex flex-col md:flex-row sm:p-8 p-4 py-16 bg-[#D9F1FD] rounded-3xl">
                {/* Left Section: Title + Intake Table */}
                <div className="md:w-[70%] md:mt-[36px] lg:mt-33[px]  xl:mt-0 lg:ms-[60px] md:[4px] lg:mt-[40px] xl:mt-0 ms-[10px]">
                    <h2 className="sm:text-[40px] text-[26px] font-semibold text-black">{title}</h2>
                    <p className="xl:text-[45px] lg:text-[62px] md:text-[48px] sm:text-[32px] text-[26px] font-mynerve font-bold text-[#FF0000] mb-6 leading-none">
                        {subtitle}
                    </p>
                    {/* Intake Table */}
                    <table className="table-auto border-collapse border font-roboto border-gray-400 bg-[#C1F177] mt-4 sm:w-[80%] w-[100%] text-[12px] sm:text-[16px]">
                        <thead>
                            <tr>
                                <th className="border border-black w-[50px] px-2 py-4 pb-2 text-center">{intakeheader?.Intake}</th>
                                <th className="border border-black w-[200px] px-2 py-4">{intakeheader?.application}</th>
                                <th className="border border-black w-[200px] px-2 py-4">{intakeheader?.Classesstart}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center ">{inTaketableHeader?.FallIntake}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.fallIntake?.applicationDeadline}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.fallIntake?.classesStart}</td>
                            </tr>
                            <tr>
                                <td className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center ">{inTaketableHeader?.springintake}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.springIntake?.applicationDeadline}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.springIntake?.classesStart}</td>
                            </tr>
                            <tr>
                                <td className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center ">{inTaketableHeader?.summerintake}</td>
                                <td className="border border-black px-4 py-[7px] ">{intakeTable?.summerIntake?.applicationDeadline}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.summerIntake?.classesStart}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                {/* Right Section: Expenses Table */}
                <div className="md:w-[50%] mt-6 sm:me-[27px] md:mt-[27px]">
                    <table className="table-auto border-collapse border border-gray-400 bg-[#C1F177] sm:ml-4 ms-[0px] w-full text-center">
                        <thead>
                            <tr className="sm:text-[19px] text-[14px] font-semibold">
                                <th className="border border-black sm:px-[20px] px-[14px] py-4">{righttableheader?.livingexpenses}</th>
                                <th className="border border-black sm:px-[20px] px-[14px]  py-4">
                                    {righttableheader?.['average ']} &nbsp; ({righttableheader["dollar "]})
                                </th>
                            </tr>
                        </thead>
                        <tbody className='sm:text-[17px] text-[14px]'>
                            <tr>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4 text-red-500">{livingTable?.Stay}</td>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4">{expensesTable?.stay?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4 text-red-500">{livingTable["foodbudget "]}</td>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4">{expensesTable?.foodBudget?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4 text-red-500">{livingTable["Localtransport "]}</td>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4">{expensesTable?.localTransport?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4 text-red-500">{livingTable["phonebills "]}</td>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4">{expensesTable?.phoneBills?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4 text-red-500">{livingTable?.movingaround}</td>
                                <td className="border border-black sm:px-[20px] px-[14px]  py-4">{expensesTable?.movingAround?.monthlyAverage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section >
    );
};

