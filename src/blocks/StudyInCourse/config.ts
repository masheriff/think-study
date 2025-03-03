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
    },
    {
        name: 'Size',
        type: 'text',
        admin: {
            description: 'Enter value with unit (e.g., 2rem, 24px)',
        },
    },
    {
        name: 'Color',
        type: 'text',
        defaultValue: '#000000',
        admin: {
            description: 'Hex color code (e.g., #FFFFFF)',
        },
    },
];

export const StudyInCourse: Block = {
    slug: 'studyInCourse',
    interfaceName: 'StudyInCourse',
    labels: {
        singular: 'Study In Course',
        plural: 'Study In Courses',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            defaultValue: 'Study in the',
        },
        {
            name: 'titleStyles',
            type: 'array',
            label: 'Title Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'country',
            type: 'text',
            required: true,
            label: 'Country',
            defaultValue: 'USA',
        },
        {
            name: 'countryStyles',
            type: 'array',
            label: 'Country Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Image',
        },
        {
            name: 'imageBackgroundColor',
            type: 'text',
            label: 'Image Background Color',
            defaultValue: '#C1F177',
            admin: {
                description: 'Hex color code for the image background',
            },
        },
        {
            name: 'containerBackgroundColor',
            type: 'text',
            label: 'Container Background Color',
            defaultValue: '#D0E9F9',
            admin: {
                description: 'Hex color code for the main container background',
            },
        },
    ],
};