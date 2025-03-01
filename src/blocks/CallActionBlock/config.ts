import { Block, Field } from 'payload';

const textStyleFields: Field[] = [
    {
        name: 'family',
        type: 'select',
        options: [
            { label: 'Inter', value: 'Inter' },
            { label: 'Roboto', value: 'Roboto' },
            { label: 'Poppins', value: 'Poppins' },
        ],
        defaultValue: 'Inter',
    },
    {
        name: 'size',
        type: 'text',
        defaultValue: '1rem',
    },
    {
        name: 'color',
        type: 'text',
        defaultValue: '#FF0000',
    },
];

export const CallActionBlock: Block = {
    slug: 'callActionBlock',
    interfaceName: 'CallActionBlock',
    labels: {
        singular: 'CTA Block',
        plural: 'CTA Blocks',
    },
    fields: [

        {
            name: 'callText',
            type: 'text',
            required: true,
            defaultValue: 'Call or WhatsApp',
        },
        {
            name: 'studentImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'logoImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'offices',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'phoneNumbers',
                    type: 'array',
                    required: true,
                    fields: [
                        {
                            name: 'number',
                            type: 'text',
                            required: true,
                        }
                    ]
                }
            ],
            defaultValue: [
                {
                    name: 'Chennai Office',
                    phoneNumbers: [
                        { number: '9169169494' },
                        { number: '9025186185' }
                    ]
                },
                {
                    name: 'Tirupati Office',
                    phoneNumbers: [
                        { number: '9169169494' },
                        { number: '9025186185' }
                    ]
                }
            ]
        },

        {
            name: 'officeStyle',
            type: 'array',
            label: 'Office Text Styles',
            fields: [...textStyleFields],
        }
    ],
};