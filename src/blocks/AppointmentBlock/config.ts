import { Block } from 'payload'

export const AppointmentBlock: Block = {
    slug: 'appointmentBlock',
    interfaceName: 'AppointmentBlock',
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
                // New field added below highlightText and above paragraphs:
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
            // Renamed "rightContent" to "right" for shorter generated identifiers.
            name: 'right',
            type: 'group',
            fields: [
                {
                    name: 'schedule',
                    type: 'group',
                    fields: [
                        {
                            name: 'date',
                            type: 'date',
                            required: true,
                        },
                        {
                            name: 'day',
                            type: 'text',
                            required: true,
                        },
                        {
                            // Renamed "timeSlots" to "slots" to reduce identifier length.
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
