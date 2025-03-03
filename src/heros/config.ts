import type { Field } from 'payload'
import { linkGroup } from '@/fields/linkGroup'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const hero: Field = {
    name: 'hero',
    type: 'group',
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'lowImpact',
            options: [
                { label: 'None', value: 'none' },
                { label: 'High Impact', value: 'highImpact' },
                { label: 'Medium Impact', value: 'mediumImpact' },
                { label: 'Low Impact', value: 'lowImpact' },
            ],
            required: true,
        },
        {
            name: 'heading',
            type: 'group',
            fields: [
                {
                    name: 'content',
                    type: 'textarea',
                    admin: {
                        description: 'Enter the text inside "|" symbols to highlight text in red. Example: "Regular text |highlighted text| regular text"',
                    },
                },
            ],
        },
        {
            name: 'description',
            type: 'group',
            fields: [
                {
                    name: 'content',
                    type: 'text',
                },
            ],
        },
        {
            name: 'richText',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ]
                },
            }),
            label: false,
        },
        linkGroup({
            overrides: {
                maxRows: 2,
            },
        }),
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            admin: {
                condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
            },
        },
    ],
}