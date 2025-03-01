import { Block, Field } from 'payload';

const textStyleFields: Field[] = [
    {
        name: 'Family',
        type: 'select',
        options: [
            { label: 'Inter', value: 'Inter' },
            { label: 'Roboto', value: 'Roboto' },
            { label: 'Open Sans', value: 'Open Sans' },
            { label: 'Montserrat', value: 'Montserrat' },
            { label: 'Delius', value: 'Delius' },
            { label: 'Lato', value: 'Lato' },
            { label: 'Poppins', value: 'Poppins' },
        ],
        defaultValue: 'Inter',
        admin: {
            description: 'Select the font family',
        },
        // Custom enum name to prevent exceeding length limit
        // name: 'fontFamilyEnum',
    },
    {
        name: 'Size',
        type: 'text',
        defaultValue: '1rem',
        admin: {
            description: 'Enter value with unit (e.g., 2rem, 24px)',
        },
        // Custom name for font size field
        // name: 'fontSizeField',
    },
    {
        name: 'Color',
        type: 'text',
        defaultValue: '#000000',
        admin: {
            description: 'Hex color code (e.g., #FFFFFF)',
        },
        // Custom name for text color field
        // name: 'textColorField',
    },
];



export const AdminssionBlock: Block = {
    slug: 'adminssionBlock',
    interfaceName: 'AdminssionBlock',
    labels: {
        singular: 'Adminssion Block',
        plural: 'Adminssion Blocks',
    },
    fields: [

        {
            name: 'year',
            type: 'text',
            required: true,
            label: 'Year',
            defaultValue: '1995',

        },
        {
            name: 'yearStyles',
            type: 'array',
            label: 'Year Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'day',
            type: 'text',
            required: true,
            label: 'Day',
            defaultValue: 'Today',
        },
        {
            name: 'currentDescription',
            type: 'text',
            required: true,
            label: 'Current Description',
            defaultValue: 'Leaders in domestic + global admissions',
        },
        {
            name: 'currentStyles',
            type: 'array',
            label: 'Current Description  Styles',
            fields: [...textStyleFields],
        },

        {
            name: 'currentYear',
            type: 'text',
            required: true,
            label: 'Current Year',
            defaultValue: '2025',
        },

        {
            name: 'ambitions',
            type: 'text',
            required: true,
            label: 'Ambitions',
            defaultValue: 'We understand your ambitions like they’re our own.',
        },
        {
            name: 'description',
            type: 'text',
            required: true,
            label: 'Description',
            defaultValue: 'Established for domestic admissions',
        },
        {
            name: 'successRate',
            type: 'text',
            required: true,
            label: 'Success Rate',
            defaultValue: 'Unlock Your Global Future – 98% Success Rate in International Admissions!',
        },
        {
            name: 'statistics',
            type: 'array',
            label: 'Statistics',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Value',
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Label',
                },
            ],
            admin: {
                description: 'Add statistics that will be displayed',
            },
        },
        {
            name: 'courses',
            type: 'array',
            label: 'Courses',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Course Name',
                },
            ],
            admin: {
                description: 'Add courses that will be displayed',
            },
        },
        {
            name: 'textStyles',
            type: 'array',
            label: 'Text Styles',
            fields: [...textStyleFields],
        },
    ],
};
