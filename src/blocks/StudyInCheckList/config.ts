import { Block, Field } from 'payload';

const textStyleFields: Field[] = [
    // {
    //     name: 'fontFamily',
    //     type: 'select',
    //     options: [
    //         { label: 'Inter', value: 'Inter' },
    //         { label: 'Roboto', value: 'Roboto' },
    //         { label: 'Open Sans', value: 'Open Sans' },
    //         { label: 'Montserrat', value: 'Montserrat' },
    //         { label: 'Delius', value: 'Delius' },
    //         { label: 'Lato', value: 'Lato' },
    //         { label: 'Poppins', value: 'Poppins' },
    //     ],
    //     defaultValue: 'Inter',
    //     admin: {
    //         description: 'Select the font family',
    //     },
    // },
    {
        name: 'fontSize',
        type: 'text',
        admin: {
            description: 'Enter value with unit (e.g., 2rem, 24px)',
        },
    },
    {
        name: 'color',
        type: 'text',
        defaultValue: '#000000',
        admin: {
            description: 'Hex color code (e.g., #FFFFFF)',
        },
    },
];

export const StudyInChecklist: Block = {
    slug: 'studyInChecklist',
    interfaceName: 'StudyInChecklist',
    labels: {
        singular: 'Study In Checklist',
        plural: 'Study In Checklists',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            defaultValue: 'Your Essential Checklist!',
        },
        {
            name: 'titleStyles',
            type: 'array',
            label: 'Title Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'subtitle',
            type: 'text',
            required: true,
            label: 'Subtitle',
            defaultValue: 'Reasons to Study in America',
        },
        {
            name: 'subStyles',
            type: 'array',
            label: 'Subtitle Styles',
            fields: [...textStyleFields],
        },
        {
            name: 'checkItems',
            type: 'array',
            label: 'Checklist Items',
            fields: [
                {
                    name: 'text',
                    type: 'textarea',
                    required: true,
                    label: 'Checklist Item Text',
                },
                {
                    name: 'Styles',
                    type: 'array',
                    label: 'Text Styles',
                    fields: [...textStyleFields],
                },
            ],
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

    ],
};