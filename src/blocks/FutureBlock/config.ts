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
        defaultValue: '#000000',
    },
];

export const FutureBlock: Block = {
    slug: 'futureBlock',
    interfaceName: 'FutureBlock',
    labels: {
        singular: 'Future Block',
        plural: 'Future Blocks',
    },
    fields: [
        {
            name: 'mainHeading',
            type: 'text',
            required: true,
            defaultValue: 'Your future is having global skills — lets make studying abroad happen!',
        },
        {
            name: 'connectText',
            type: 'text',
            required: true,
            defaultValue: 'connect with our team today!',
        },
        {
            name: 'buttonText',
            type: 'text',
            required: true,
            defaultValue: 'Schedule Counseling',
        },
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
            name: 'headingStyles',
            type: 'array',
            label: 'Heading Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'connectStyles',
            type: 'array',
            label: 'Connect Text Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'officeStyles',
            type: 'array',
            label: 'Office Text Styles',
            fields: [...textStyleFields],
        }
    ],
};