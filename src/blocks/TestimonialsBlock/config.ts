import { Block } from 'payload'

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
            type: 'text',
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