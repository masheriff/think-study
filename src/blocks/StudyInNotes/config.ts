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

            name: 'intakeheader',
            type: 'group',
            label: 'Intake Header',
            fields: [
                {
                    name: 'Intake',
                    type: 'text',
                    label: 'Intake',
                    defaultValue: 'Intake',
                    required: true,
                },
                {
                    name: 'application',
                    type: 'text',
                    label: 'Application Deadline',
                    defaultValue: 'Application Deadline',
                    required: true,
                },
                {
                    name: 'Classesstart',
                    type: 'text',
                    label: 'Classes Start Usually',
                    defaultValue: 'Classes Start Usually',
                    required: true,
                },
            ],

        },
        {

            name: 'inTaketableHeader',
            type: 'group',
            label: 'Intake Header',
            fields: [
                {
                    name: 'FallIntake',
                    type: 'text',
                    label: 'FallIntake',
                    defaultValue: 'Fall Intake',
                    required: true,
                },
                {
                    name: 'springintake',
                    type: 'text',
                    label: 'SpringIntake',
                    defaultValue: 'Spring Intake',
                    required: true,
                },
                {
                    name: 'summerintake',
                    type: 'text',
                    label: 'Summer Intake',
                    defaultValue: 'Summer Intake',
                    required: true,
                },
            ],

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

            name: 'righttableheader',
            type: 'group',
            label: 'Header',
            fields: [
                {
                    name: 'livingexpenses',
                    type: 'text',
                    label: 'Living Expenses',
                    defaultValue: 'Living Expenses',
                    required: true,
                },
                {
                    name: 'average ',
                    type: 'text',
                    label: 'Average Expenses',
                    defaultValue: 'Monthly Average Expenses (in USD)',
                    required: true,
                },
                {
                    name: 'dollar ',
                    type: 'text',
                    label: 'Dollar',
                    defaultValue: 'in USD',
                    required: true,
                },

            ],

        },

        {

            name: 'livingTable',
            type: 'group',
            label: 'Living Table',
            fields: [
                {
                    name: 'Stay',
                    type: 'text',
                    label: 'Stay',
                    defaultValue: 'Stay',
                    required: true,
                },
                {
                    name: 'foodbudget ',
                    type: 'text',
                    label: 'Food Budget',
                    defaultValue: 'Food Budget',
                    required: true,
                },
                {
                    name: 'Localtransport ',
                    type: 'text',
                    label: 'Local Transport',
                    defaultValue: 'Local Transport',
                    required: true,
                },
                {
                    name: 'phonebills ',
                    type: 'text',
                    label: 'Phone Bills',
                    defaultValue: 'Phone Bills',
                    required: true,
                },
                {
                    name: 'movingaround',
                    type: 'text',
                    label: 'Moving Around',
                    defaultValue: 'Moving Around',
                    required: true,
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