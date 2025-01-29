import { Block } from 'payload'

export const CounselingBlock: Block = {
    slug: 'counselingBlock',
    interfaceName: 'CounselingBlock',
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