import { Block } from 'payload'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const AppointmentBlock: Block = {
    slug: 'appointmentBlock',
    interfaceName: 'AppointmentBlock',
    fields: [
        {
            name: 'leftContent',
            type: 'group',
            fields: [
                {
                    name: 'richText',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({ rootFeatures }) => [
                            ...rootFeatures,
                            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                        ],
                    }),
                    required: true,
                },
                {
                    name: 'paragraph1',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'paragraph2',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'paragraph3',
                    type: 'text',
                    required: true,
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
            name: 'rightContent',
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
                            name: 'time',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'info',
                    type: 'group',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'imgs',
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
            ],
        },
        {
            name: 'bottomText',
            type: 'text',
            required: true,
        },
    ],
}