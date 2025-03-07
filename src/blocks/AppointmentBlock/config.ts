import { Block } from 'payload'

export const AppointmentBlock: Block = {
    slug: 'appointmentBlock',
    interfaceName: 'AppointmentBlock',
    imageURL: '/assets/blocks/Appointment.png',
    imageAltText: 'Appointment Block Image',
    fields: [
        {
            name: 'leftContent',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'subTitle',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'highlightText',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'extraText',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'paragraphs',
                    type: 'array',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'button',
                    type: 'group',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'url',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: 'right',
            type: 'group',
            fields: [
                {
                    name: 'schedule',
                    type: 'group',
                    fields: [
                        {
                            name: 'fromDate',
                            type: 'date',
                            required: true,
                            admin: {
                                description: 'Start date of the appointment range'
                            }
                        },
                        {
                            name: 'toDate',
                            type: 'date',
                            required: false,
                            admin: {
                                description: 'End date of the appointment range (optional)'
                            }
                        },
                        {
                            name: 'day',
                            type: 'text',
                        },
                        {
                            name: 'slots',
                            type: 'array',
                            fields: [
                                {
                                    name: 'time',
                                    type: 'text',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'universities',
                    type: 'array',
                    fields: [
                        {
                            name: 'img',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                        {
                            name: 'alt',
                            type: 'text',
                        },
                    ],
                },
            ],
        },
        {
            name: 'bottomText',
            type: 'text',
            required: true,
        },
    ],
}