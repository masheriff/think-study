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
    intakeTable,
    expensesTable,
    className,
}) => {
    return (
        <section className={cn('container ', className)} >
            <div className="flex flex-col md:flex-row p-6 py-16 bg-[#D9F1FD] rounded-3xl">
                {/* Left Section: Title + Intake Table */}
                <div className="md:w-[70%] ms-[40px]">
                    <h2 className="text-[40px] font-semibold text-black">Study Abroad Smarter:</h2>
                    <p className="text-[40px] font-bold text-[#FF0000] mb-6 leading-tight italic">
                        The Insider Notes You Need Before You Pack!
                    </p>

                    {/* Intake Table */}
                    <table className="table-auto border-collapse border border-gray-400 bg-[#C1F177] mt-4 w-[80%]">
                        <thead>
                            <tr>
                                <th className="border border-black w-[50px] px-2 py-4 pb-2 text-center">Intake</th>
                                <th className="border border-black w-[200px] px-2 py-4">Application Deadline</th>
                                <th className="border border-black w-[200px] px-2 py-4">Classes Start Usually</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center ">Fall Intake</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.fallIntake?.applicationDeadline}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.fallIntake?.classesStart}</td>
                            </tr>
                            <tr>
                                <td className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center ">Spring Intake</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.springIntake?.applicationDeadline}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.springIntake?.classesStart}</td>
                            </tr>
                            <tr>
                                <td className="border border-black w-[50px] px-2 py-[7px] text-red-500 text-center ">Summer Intake</td>
                                <td className="border border-black px-4 py-[7px] ">{intakeTable?.summerIntake?.applicationDeadline}</td>
                                <td className="border border-black px-4 py-[7px]">{intakeTable?.summerIntake?.classesStart}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                {/* Right Section: Expenses Table */}
                <div className="md:w-[50%] mt-6 me-[27px] md:mt-[8px]">
                    <table className="table-auto border-collapse border border-gray-400 bg-[#C1F177] ml-4 w-full text-center">
                        <thead>
                            <tr className="text-[22px] font-semibold">
                                <th className="border border-black px-[20px] py-4">Living Expenses</th>
                                <th className="border border-black px-[20px] py-4">
                                    Monthly Average Expenses <br /> (in USD)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black px-[20px] py-4 text-red-500">Stay</td>
                                <td className="border border-black px-[20px] py-4">{expensesTable?.stay?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-[20px] py-4 text-red-500">Food Budget</td>
                                <td className="border border-black px-[20px] py-4">{expensesTable?.foodBudget?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-[20px] py-4 text-red-500">Local Transport</td>
                                <td className="border border-black px-[20px] py-4">{expensesTable?.localTransport?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-[20px] py-4 text-red-500">Phone Bills</td>
                                <td className="border border-black px-[20px] py-4">{expensesTable?.phoneBills?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-[20px] py-4 text-red-500">Moving Around</td>
                                <td className="border border-black px-[20px] py-4">{expensesTable?.movingAround?.monthlyAverage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section >
    );
};

