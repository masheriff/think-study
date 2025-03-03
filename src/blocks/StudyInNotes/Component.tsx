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
            <div className="flex flex-col md:flex-row  p-4 bg-[#D9F1FD] rounded-3xl">
                {/* Intake Table */}
                <div className=' '>
                    <h2 className="text-2xl font-bold text-red-600">{title}</h2>
                    <p className="text-xl font-semibold text-red-600">{subtitle}</p>
                    <div>
                        <table className="table-auto border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">Intake</th>
                                    <th className="border border-gray-400 px-4 py-2">Application Deadline</th>
                                    <th className="border border-gray-400 px-4 py-2">Classes Start Usually</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2 text-red-500">Fall Intake</td>
                                    <td className="border border-gray-400 px-4 py-2">{intakeTable?.fallIntake?.applicationDeadline}</td>
                                    <td className="border border-gray-400 px-4 py-2">{intakeTable?.fallIntake?.classesStart}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2 text-red-500">Spring Intake</td>
                                    <td className="border border-gray-400 px-4 py-2">{intakeTable?.springIntake?.applicationDeadline}</td>
                                    <td className="border border-gray-400 px-4 py-2">{intakeTable?.springIntake?.classesStart}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2 text-red-500">Summer Intake</td>
                                    <td className="border border-gray-400 px-4 py-2">{intakeTable?.summerIntake?.applicationDeadline}</td>
                                    <td className="border border-gray-400 px-4 py-2">{intakeTable?.summerIntake?.classesStart}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4">
                    <table className="table-auto border-collapse border border-gray-400 ml-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">Living Expenses</th>
                                <th className="border border-gray-400 px-4 py-2">Monthly Average Expenses (in USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2 text-red-500">Stay</td>
                                <td className="border border-gray-400 px-4 py-2">{expensesTable?.stay?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2 text-red-500">Food Budget</td>
                                <td className="border border-gray-400 px-4 py-2">{expensesTable?.foodBudget?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2 text-red-500">Local Transport</td>
                                <td className="border border-gray-400 px-4 py-2">{expensesTable?.localTransport?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2 text-red-500">Phone Bills</td>
                                <td className="border border-gray-400 px-4 py-2">{expensesTable?.phoneBills?.monthlyAverage}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2 text-red-500">Moving Around</td>
                                <td className="border border-gray-400 px-4 py-2">{expensesTable?.movingAround?.monthlyAverage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Expenses Table */}

        </section >
    );
};

