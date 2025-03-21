import type { Block } from 'payload'

export const UniversitySliderBlock: Block = {
    slug: 'universitySliderBlock',
    interfaceName: 'UniversitySliderBlock',
    imageURL: '/assets/blocks/UniversitySliderBlock.png',
    imageAltText: 'UniversitySliderBlock Image',
    fields: [
        {
            name: 'slides',
            type: 'array',
            fields: [
                {
                    name: 'backgroundImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'universityImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
            ]
        },

    ],
}
