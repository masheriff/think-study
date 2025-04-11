'use client'

import React from 'react';
import type { StudyInInsights as StudyInInsightsType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type Props = StudyInInsightsType & {
    className?: string;
};

export const StudyInInsights: React.FC<Props> = ({
    contentHeader,
    intakeRows,
    expenseRows,
    className,
}) => {
    // Split rows into headers and data for intake table
    const intakeHeaderRow = intakeRows?.find(row => row.isHeader);
    const intakeDataRows = intakeRows?.filter(row => !row.isHeader) || [];

    // Split rows into headers and data for expenses table
    const expenseHeaderRow = expenseRows?.find(row => row.isHeader);
    const expenseDataRows = expenseRows?.filter(row => !row.isHeader) || [];

    return (
        <section className={cn("mx-6", className)}>
            <div className="container bg-[#D9F1FD] p-6 lg:p-16 rounded-3xl" aria-labelledby="study-notes-title">
                <div className="flex flex-col items-center justify-between md:flex-row  gap-4 md:gap-8 overflow-hidden">
                    {/* Left Section: Title + Intake Table */}
                    <div className="w-full md:w-full lg:w-1/2 xl:w-7/12 flex flex-col items-start justify-center py-4 md:py-0">
                        <h2 id="study-notes-title" className="sm:text-[40px] text-[26px] font-semibold text-black mb-2">
                            {contentHeader?.title || 'Study Abroad Smarter:'}
                        </h2>
                        <p className="xl:text-[45px] lg:text-[62px] md:text-[48px] sm:text-[32px] text-[26px] font-mynerve font-bold text-[#FF0000] mb-6 leading-none">
                            {contentHeader?.subtitle || 'The Insider Notes You Need Before You Pack!'}
                        </p>

                        {/* Intake Table with Caption */}
                        <div className="overflow-x-auto w-full">
                            <table className="table-auto border-collapse border font-roboto border-gray-400 bg-[#C1F177] mt-4 w-full text-[12px] sm:text-[16px]">
                                <caption className="sr-only">Academic Intake Schedule</caption>
                                {intakeHeaderRow && (
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border border-black w-[100px] px-2 py-4 pb-2 text-center font-semibold">
                                                {intakeHeaderRow.intakeName}
                                            </th>
                                            <th scope="col" className="border border-black w-[200px] px-2 py-4 font-semibold">
                                                {intakeHeaderRow.applicationDeadline}
                                            </th>
                                            <th scope="col" className="border border-black w-[200px] px-2 py-4 font-semibold">
                                                {intakeHeaderRow.classesStart}
                                            </th>
                                        </tr>
                                    </thead>
                                )}
                                <tbody>
                                    {intakeDataRows.map((row, index) => (
                                        <tr key={`intake-${index}`}>
                                            <th scope="row" className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center font-medium">
                                                {row.intakeName}
                                            </th>
                                            <td className="border border-black px-4 py-[7px] text-center">
                                                {row.applicationDeadline}
                                            </td>
                                            <td className="border border-black px-4 py-[7px] text-center">
                                                {row.classesStart}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Section: Expenses Table */}
                    <div className="w-full md:w-full lg:w-1/2 xl:w-2/6 relative md:h-auto mt-6 md:mt-0 flex items-start">
                        <div className="overflow-x-auto w-full">
                            <table className="table-auto border-collapse border border-gray-400 bg-[#C1F177] w-full text-center">
                                <caption className="sr-only">Monthly Living Expenses</caption>
                                {expenseHeaderRow && (
                                    <thead>
                                        <tr className="sm:text-[18px] text-[14px] font-semibold">
                                            <th scope="col" className="border border-black sm:px-[20px] px-[14px] py-4">
                                                {expenseHeaderRow.category}
                                            </th>
                                            <th scope="col" className="border border-black sm:px-[20px] px-[14px] py-4">
                                                {expenseHeaderRow.monthlyAverage}
                                            </th>
                                        </tr>
                                    </thead>
                                )}
                                <tbody className='sm:text-[16px] text-[14px]'>
                                    {expenseDataRows.map((row, index) => (
                                        <tr key={`expense-${index}`}>
                                            <th scope="row" className="border border-black sm:px-[20px] px-[14px] py-4 text-red-500 font-medium text-center">
                                                {row.category}
                                            </th>
                                            <td className="border border-black sm:px-[20px] px-[14px] py-4">
                                                {row.monthlyAverage}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default StudyInInsights;