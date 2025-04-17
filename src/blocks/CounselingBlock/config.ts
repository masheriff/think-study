import { Block } from 'payload'
import { link } from '@/fields/link'

export const CounselingBlock: Block = {
    slug: 'counselingBlock',
    interfaceName: 'CounselingBlock',
    imageURL: '/assets/blocks/CounselingBlock.png',
    imageAltText: 'CounselingBlock Image',
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
        link({
            appearances: false,
        }),
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'cards',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'courseName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'cardImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                link({
                    appearances: false,
                }),
                {
                    name: 'countries',
                    type: 'array',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
}