import type { Block } from 'payload'

export const WorldStudentBlock: Block = {
    slug: 'worldStudentBlock',
    interfaceName: 'WorldStudentBlock',
    fields: [
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'title',
            type: 'richText',
            required: true,
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 6,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'z-index',
                    type: 'number',
                    required: true,
                    defaultValue: 10,
                },
                {
                    name: 'top',
                    type: 'number',
                },
                {
                    name: 'bottom',
                    type: 'number',
                },
                {
                    name: 'right',
                    type: 'number',
                },
                {
                    name: 'left',
                    type: 'number',
                },
            ],
        },
    ],
}
