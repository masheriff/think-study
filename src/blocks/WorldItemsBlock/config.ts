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
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },

                {
                    type: 'row',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '33.33%',
                            }
                        },
                        {
                            name: 'description',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '33.33%',
                            }
                        },
                        {
                            name: 'z-index',
                            type: 'number',
                            defaultValue: 10,
                            admin: {
                                width: '33.33%',
                            }
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
                                description: 'Vertical alignment of this marker',
                                width: '50%',
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
                                description: 'Horizontal alignment of this marker',
                                width: '50%',
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
                                description: 'Position from top or bottom in percentage (based on vertical alignment)',
                                width: '50%',
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
                                description: 'Position from left or right in percentage (based on horizontal alignment)',
                                width: '50%',
                            }
                        },
                    ]
                },

                {
                    name: 'stack',
                    type: 'array',
                    fields: [
                        {
                            name: 'stackImage',
                            type: 'upload',
                            relationTo: 'media',
                        },
                    ]
                }


            ],
        },
        {
            name: 'countryCarousel',
            type: 'relationship',
            relationTo: 'countries',
            hasMany: true,
            admin: {
                description:
                    'Select which countries are to be displayed in the carousel below the world map',
            },
        },
    ],
}