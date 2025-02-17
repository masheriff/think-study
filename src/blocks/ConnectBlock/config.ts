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

export const ConnectBlock: Block = {
    slug: 'connectBlock',
    interfaceName: 'ConnectBlock',
    labels: {
        singular: 'Connect Block',
        plural: 'Connect Blocks',
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

    ],
};