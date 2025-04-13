import type { Block } from 'payload'

export const WorldItemsBlock: Block = {
    slug: 'worldItemsBlock',
    interfaceName: 'WorldItemsBlock',
    imageURL: '/assets/blocks/WorldItemsBlock.png',
    imageAltText: 'WorldItemsBlock Image',
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
            name: 'centerPoint',
            type: 'group',
            fields: [
                {
                    name: 'xPosition',
                    label: 'Horizontal Position (%)',
                    type: 'number',
                    required: true,
                    defaultValue: 67,
                    min: 0,
                    max: 100,
                    admin: {
                        description: 'Horizontal position of center point in percentage (0% = left, 100% = right)'
                    }
                },
                {
                    name: 'yPosition',
                    label: 'Vertical Position (%)',
                    type: 'number',
                    required: true,
                    defaultValue: 45,
                    min: 0,
                    max: 100,
                    admin: {
                        description: 'Vertical position of center point in percentage (0% = top, 100% = bottom)'
                    }
                }
            ]
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 30,
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
                    name: 'vAlign',
                    label: 'Vertical Alignment',
                    type: 'radio',
                    required: true,
                    defaultValue: 'top',
                    options: [
                        {
                            label: 'Top',
                            value: 'top',
                        },
                        {
                            label: 'Bottom',
                            value: 'bottom',
                        }
                    ],
                    admin: {
                        description: 'Vertical alignment of this marker'
                    }
                },
                {
                    name: 'vPos',
                    label: 'Vertical Position (%)',
                    type: 'number',
                    required: true,
                    min: 0,
                    max: 100,
                    defaultValue: 50,
                    admin: {
                        description: 'Position from top or bottom in percentage (based on vertical alignment)'
                    }
                },
                {
                    name: 'hAlign',
                    label: 'Horizontal Alignment',
                    type: 'radio',
                    required: true,
                    defaultValue: 'left',
                    options: [
                        {
                            label: 'Left',
                            value: 'left',
                        },
                        {
                            label: 'Right',
                            value: 'right',
                        }
                    ],
                    admin: {
                        description: 'Horizontal alignment of this marker'
                    }
                },
                {
                    name: 'hPos',
                    label: 'Horizontal Position (%)',
                    type: 'number',
                    required: true,
                    min: 0,
                    max: 100,
                    defaultValue: 50,
                    admin: {
                        description: 'Position from left or right in percentage (based on horizontal alignment)'
                    }
                },
            ],
        },
    ],
}