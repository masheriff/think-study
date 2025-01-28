import { Block } from 'payload'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const TestimonialsBlock: Block = {
    slug: 'testimonialsBlock',
    interfaceName: 'TestimonialsBlock',
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
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
            name: 'testimonials',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'review',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'course',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'universityImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}