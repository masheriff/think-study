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
        <section className={cn('container', className)} aria-labelledby="study-notes-title">
            <div className="bg-[#D9F1FD] rounded-3xl flex flex-col md:flex-row p-4 sm:p-6 md:p-8 gap-4 md:gap-8 overflow-hidden">
                {/* Left Section: Title + Intake Table */}
                <div className="md:w-full lg:w-1/2 xl:w-4/6 flex flex-col items-start justify-center py-4 md:py-0">
                    <h2 id="study-notes-title" className="sm:text-[40px] text-[26px] font-semibold text-black mb-2">{title}</h2>
                    <p className="xl:text-[45px] lg:text-[62px] md:text-[48px] sm:text-[32px] text-[26px] font-mynerve font-bold text-[#FF0000] mb-6 leading-none">
                        {subtitle}
                    </p>

                    {/* Intake Table with Caption */}
                    <div className="overflow-x-auto w-full">
                        <table className="table-auto border-collapse border font-roboto border-gray-400 bg-[#C1F177] mt-4 w-full text-[12px] sm:text-[16px]">
                            <caption className="sr-only">Academic Intake Schedule</caption>
                            <thead>
                                <tr>
                                    <th scope="col" className="border border-black w-[100px] px-2 py-4 pb-2 text-center font-semibold">{intakeheader?.Intake || 'Intake'}</th>
                                    <th scope="col" className="border border-black w-[200px] px-2 py-4 font-semibold">{intakeheader?.application || 'Application Deadline'}</th>
                                    <th scope="col" className="border border-black w-[200px] px-2 py-4 font-semibold">{intakeheader?.Classesstart || 'Classes Start'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center font-medium">{inTaketableHeader?.FallIntake || 'Fall'}</th>
                                    <td className="border border-black px-4 py-[7px]">{intakeTable?.fallIntake?.applicationDeadline || 'N/A'}</td>
                                    <td className="border border-black px-4 py-[7px]">{intakeTable?.fallIntake?.classesStart || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center font-medium">{inTaketableHeader?.springintake || 'Spring'}</th>
                                    <td className="border border-black px-4 py-[7px]">{intakeTable?.springIntake?.applicationDeadline || 'N/A'}</td>
                                    <td className="border border-black px-4 py-[7px]">{intakeTable?.springIntake?.classesStart || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center font-medium">{inTaketableHeader?.summerintake || 'Summer'}</th>
                                    <td className="border border-black px-4 py-[7px]">{intakeTable?.summerIntake?.applicationDeadline || 'N/A'}</td>
                                    <td className="border border-black px-4 py-[7px]">{intakeTable?.summerIntake?.classesStart || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Section: Expenses Table */}
                <div className="md:w-full lg:w-1/2 xl:w-2/6 relative md:h-auto mt-6 md:mt-0 flex items-start">
                    <div className="overflow-x-auto w-full">
                        <table className="table-auto border-collapse border border-gray-400 bg-[#C1F177] w-full text-center">
                            <caption className="sr-only">Monthly Living Expenses</caption>
                            <thead>
                                <tr className="sm:text-[18px] text-[14px] font-semibold">
                                    <th scope="col" className="border border-black sm:px-[20px] px-[14px] py-4">{righttableheader?.livingexpenses || 'Living Expenses'}</th>
                                    <th scope="col" className="border border-black sm:px-[20px] px-[14px] py-4">
                                        {righttableheader?.['average '] || 'Average'} &nbsp; ({righttableheader?.["dollar "] || '$'})
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='sm:text-[16px] text-[14px]'>
                                <tr>
                                    <th scope="row" className="border border-black sm:px-[20px] px-[14px] py-4 text-red-500 font-medium text-left pl-4">{livingTable?.Stay || 'Accommodation'}</th>
                                    <td className="border border-black sm:px-[20px] px-[14px] py-4">{expensesTable?.stay?.monthlyAverage || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border border-black sm:px-[20px] px-[14px] py-4 text-red-500 font-medium text-left pl-4">{livingTable?.["foodbudget "] || 'Food Budget'}</th>
                                    <td className="border border-black sm:px-[20px] px-[14px] py-4">{expensesTable?.foodBudget?.monthlyAverage || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border border-black sm:px-[20px] px-[14px] py-4 text-red-500 font-medium text-left pl-4">{livingTable?.["Localtransport "] || 'Local Transport'}</th>
                                    <td className="border border-black sm:px-[20px] px-[14px] py-4">{expensesTable?.localTransport?.monthlyAverage || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border border-black sm:px-[20px] px-[14px] py-4 text-red-500 font-medium text-left pl-4">{livingTable?.["phonebills "] || 'Phone Bills'}</th>
                                    <td className="border border-black sm:px-[20px] px-[14px] py-4">{expensesTable?.phoneBills?.monthlyAverage || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border border-black sm:px-[20px] px-[14px] py-4 text-red-500 font-medium text-left pl-4">{livingTable?.movingaround || 'Moving Around'}</th>
                                    <td className="border border-black sm:px-[20px] px-[14px] py-4">{expensesTable?.movingAround?.monthlyAverage || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudyInNotes;