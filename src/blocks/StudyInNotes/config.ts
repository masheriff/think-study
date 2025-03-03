import { Block } from 'payload';

export const StudyInNotes: Block = {
    slug: 'studyInNotes',
    interfaceName: 'StudyInNotes',
    labels: {
        singular: 'Study In Abroad',
        plural: 'Study In Abroads',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            defaultValue: 'Study Abroad Smarter:',
            required: true,
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitle',
            defaultValue: 'The Insider Notes You Need Before You Pack!',
            required: true,
        },
        {
            name: 'intakeTable',
            type: 'group',
            label: 'Intake Table',
            fields: [
                {
                    name: 'fallIntake',
                    type: 'group',
                    label: 'Fall Intake',
                    fields: [
                        {
                            name: 'applicationDeadline',
                            type: 'text',
                            label: 'Application Deadline',
                            defaultValue: 'December To March',
                            required: true,
                        },
                        {
                            name: 'classesStart',
                            type: 'text',
                            label: 'Classes Start Usually',
                            defaultValue: 'August to September',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'springIntake',
                    type: 'group',
                    label: 'Spring Intake',
                    fields: [
                        {
                            name: 'applicationDeadline',
                            type: 'text',
                            label: 'Application Deadline',
                            defaultValue: 'July To November',
                            required: true,
                        },
                        {
                            name: 'classesStart',
                            type: 'text',
                            label: 'Classes Start Usually',
                            defaultValue: 'January to February',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'summerIntake',
                    type: 'group',
                    label: 'Summer Intake',
                    fields: [
                        {
                            name: 'applicationDeadline',
                            type: 'text',
                            label: 'Application Deadline',
                            defaultValue: 'January To March',
                            required: true,
                        },
                        {
                            name: 'classesStart',
                            type: 'text',
                            label: 'Classes Start Usually',
                            defaultValue: 'May or June',
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: 'expensesTable',
            type: 'group',
            label: 'Expenses Table',
            fields: [
                {
                    name: 'stay',
                    type: 'group',
                    label: 'Stay',
                    fields: [
                        {
                            name: 'monthlyAverage',
                            type: 'text',
                            label: 'Monthly Average (USD)',
                            defaultValue: 'Around 1000 on sharing',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'foodBudget',
                    type: 'group',
                    label: 'Food Budget',
                    fields: [
                        {
                            name: 'monthlyAverage',
                            type: 'text',
                            label: 'Monthly Average (USD)',
                            defaultValue: 'we can make in 500',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'localTransport',
                    type: 'group',
                    label: 'Local Transport',
                    fields: [
                        {
                            name: 'monthlyAverage',
                            type: 'text',
                            label: 'Monthly Average (USD)',
                            defaultValue: '200 will be a good budget',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'phoneBills',
                    type: 'group',
                    label: 'Phone Bills',
                    fields: [
                        {
                            name: 'monthlyAverage',
                            type: 'text',
                            label: 'Monthly Average (USD)',
                            defaultValue: '75 is the average budget',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'movingAround',
                    type: 'group',
                    label: 'Moving Around',
                    fields: [
                        {
                            name: 'monthlyAverage',
                            type: 'text',
                            label: 'Monthly Average (USD)',
                            defaultValue: '250-300 but depends',
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
};