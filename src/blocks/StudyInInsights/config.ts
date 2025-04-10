import { Block } from 'payload';

export const StudyInInsights: Block = {
    slug: 'studyInInsights',
    interfaceName: 'StudyInInsights',
    imageURL: '/assets/blocks/StudyIn-Notes.svg',
    imageAltText: 'Study In Insights',
    labels: {
        singular: 'Study Abroad Notes',
        plural: 'Study Abroad Notes',
    },
    fields: [
        // Basic Information
        {
            name: 'contentHeader',
            type: 'group',
            label: 'Content Header',
            admin: {
                description: 'Main heading and subheading for the study abroad information section',
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Title',
                            defaultValue: 'Study Abroad Smarter:',
                            required: true,
                            admin: {
                                width: '50%',
                            }
                        },
                        {
                            name: 'subtitle',
                            type: 'text',
                            label: 'Subtitle',
                            defaultValue: 'The Insider Notes You Need Before You Pack!',
                            required: true,
                            admin: {
                                width: '50%',
                            }
                        }
                    ]
                }
            ]
        },

        // Intake Table Section
        {
            name: 'intakeRows',
            type: 'array',
            label: 'Intake Schedule',
            admin: {
                description: 'Add academic intake periods and their schedules',
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'isHeader',
                            type: 'checkbox',
                            label: 'Is Header Row',
                            defaultValue: false,
                            admin: {
                                width: '100%',
                            }
                        },
                        {
                            name: 'intakeName',
                            type: 'text',
                            label: 'Intake Name/Column Label',
                            required: true,
                            admin: {
                                width: '33.33%',
                            }
                        },
                        {
                            name: 'applicationDeadline',
                            type: 'text',
                            label: 'Application Deadline',
                            required: true,
                            admin: {
                                width: '33.33%',
                            }
                        },
                        {
                            name: 'classesStart',
                            type: 'text',
                            label: 'Classes Start',
                            required: true,
                            admin: {
                                width: '33.33%',
                            }
                        },
                    ]
                },

            ],
            defaultValue: [
                {
                    isHeader: true,
                    intakeName: 'Intake',
                    applicationDeadline: 'Application Deadline',
                    classesStart: 'Classes Start Usually',
                },
                {
                    isHeader: false,
                    intakeName: 'Fall Intake',
                    applicationDeadline: 'December To March',
                    classesStart: 'August to September',
                },
                {
                    isHeader: false,
                    intakeName: 'Spring Intake',
                    applicationDeadline: 'July To November',
                    classesStart: 'January to February',
                },
                {
                    isHeader: false,
                    intakeName: 'Summer Intake',
                    applicationDeadline: 'January To March',
                    classesStart: 'May or June',
                },
            ],
        },

        // Expenses Table Section
        {
            name: 'expenseRows',
            type: 'array',
            label: 'Living Expenses',
            admin: {
                description: 'Add expense categories and their average costs',
            },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'isHeader',
                            type: 'checkbox',
                            label: 'Is Header Row',
                            defaultValue: false,
                            admin: {
                                width: '20%',
                            }
                        },
                        {
                            name: 'category',
                            type: 'text',
                            label: 'Category/Column Name',
                            required: true,
                            admin: {
                                width: '30%',
                            }
                        },
                        {
                            name: 'monthlyAverage',
                            type: 'text',
                            label: 'Monthly Average',
                            required: true,
                            admin: {
                                width: '50%',
                            }
                        },
                    ]
                }

            ],
            defaultValue: [
                {
                    isHeader: true,
                    category: 'Living Expenses',
                    monthlyAverage: 'Monthly Average (in USD)',
                },
                {
                    isHeader: false,
                    category: 'Stay',
                    monthlyAverage: 'Around 1000 on sharing',
                },
                {
                    isHeader: false,
                    category: 'Food Budget',
                    monthlyAverage: 'we can make in 500',
                },
                {
                    isHeader: false,
                    category: 'Local Transport',
                    monthlyAverage: '200 will be a good budget',
                },
                {
                    isHeader: false,
                    category: 'Phone Bills',
                    monthlyAverage: '75 is the average budget',
                },
                {
                    isHeader: false,
                    category: 'Moving Around',
                    monthlyAverage: '250-300 but depends',
                },
            ],
        },
    ],
};