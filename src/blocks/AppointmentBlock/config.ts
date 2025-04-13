import { Block } from 'payload'
import { link } from '@/fields/link'

export const AppointmentBlock: Block = {
    slug: 'appointmentBlock',
    interfaceName: 'AppointmentBlock',
    imageURL: '/assets/blocks/Appointment.png',
    imageAltText: 'Appointment Block Image',
    fields: [
        {
            name: 'visibility',
            type: 'checkbox',
            label: 'Visibility',
            admin: {
                description: 'Toggle to show/hide the block without deleting it',
                width: '100%',
            },
            defaultValue: true,
        },
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
                link({
                    appearances: false,
                })
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
                            admin: {
                                description: 'Enter only for single date.'
                            }
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
                    name: 'uniHeading',
                    type: 'text',
                    required: true,
                    defaultValue: 'Participating Universities',
                    admin: {
                        description: 'Heading for universities section'
                    }
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