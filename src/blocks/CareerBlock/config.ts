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

export const CareerBlock: Block = {
    slug: 'careerBlock',
    interfaceName: 'careerBlock',
    labels: {
        singular: 'Career Counseling Block',
        plural: 'Career Counseling Blocks',
    },
    fields: [
        {
            name: 'worldMapImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'mainHeading',
            type: 'text',
            required: true,
            defaultValue: 'Career-Focused Counseling',
        },
        {
            name: 'mainSubheading',
            type: 'text',
            required: true,
            defaultValue: 'help you choose the best study abroad programs for long-term career success.',
        },
        {
            name: 'secondaryHeading',
            type: 'text',
            required: true,
            defaultValue: 'Strong Visa Success Rate',
        },
        {
            name: 'secondarySubheading',
            type: 'text',
            required: true,
            defaultValue: 'Expert support in preparing documentation, SOPs, and interview training',
        },
        {
            name: 'statistics',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
            ],
            defaultValue: [
                { value: '1,500+', label: 'Students Placed Annually' },
                { value: '28+', label: 'Years of Education Expertise' },
            ],
        },

        {
            name: 'bText',
            type: 'array',
            label: ' Buttons',
            minRows: 1,
            maxRows: 15,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                    defaultValue: 'Schedule Counseling',
                },


            ],
        },



        {
            name: 'headStyles',
            type: 'array',
            label: 'Heading Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'subStyles',
            type: 'array',
            label: 'Subheading Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'statStyles',
            type: 'array',
            label: 'Statistics Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'Styles',
            type: 'array',
            label: 'Button Styles',
            fields: [...textStyleFields],
        },
    ],
};