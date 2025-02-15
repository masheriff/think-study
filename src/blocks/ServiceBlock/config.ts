import { Block, Field } from 'payload';

const headingStyleFields: Field[] = [
    {
        name: 'family',
        type: 'select',
        options: [
            { label: 'Inter', value: 'Inter' },
            { label: 'Roboto', value: 'Roboto' },
            { label: 'Open Sans', value: 'Open Sans' },
            { label: 'Montserrat', value: 'Montserrat' },
        ],
        defaultValue: 'Inter',
    },
    {
        name: 'size',
        type: 'text',
        // defaultValue: '1rem',
    },
    {
        name: 'color',
        type: 'text',
        // defaultValue: '#FF0000',
    },
    {
        name: 'backgroundColor',
        type: 'text',
    }
];

export const ServiceBlock: Block = {
    slug: 'serviceBlock',
    interfaceName: 'ServiceBlock',
    labels: {
        singular: 'Service Block',
        plural: 'Service Blocks',
    },
    fields: [
        {
            name: 'backgroundimage',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'mainHeading',
            type: 'text',
            required: true,
            defaultValue: "Here's What We Do & Why We're the Right Choice for You",
        },
        {
            name: 'mainHeadingStyles',
            type: 'group',
            fields: [...headingStyleFields],
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            defaultValue: "Getting into your dream university isn't just about meeting requirements — it's about finding the right fit for your ambitions and future goals.",
        },
        {
            name: 'subDescription',
            type: 'textarea',
            required: true,
            defaultValue: 'At Think Study, we provide end-to-end guidance, helping students navigate everything from choosing the right course to securing admissions with confidence.',
        },
        {
            name: 'descriptionStyle',
            type: 'group',
            fields: [...headingStyleFields],
        },

        {
            name: 'buttonText',
            type: 'text',
            required: true,
        },
        {
            name: 'buttonStyle',
            type: 'group',
            fields: [...headingStyleFields],
        },
        {
            name: 'services',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                },

            ],
            defaultValue: [
                {
                    title: 'Tailor-Made Solutions',
                    description: 'Every student is different, so we offer personalized options to match your goals.',
                },
                {
                    title: 'Comprehensive Support',
                    description: "From applications to acceptances, we're with you at every step.",
                },
                {
                    title: 'Seamless Access',
                    description: 'Stay updated on program details, application status, and profile management',
                },
                {
                    title: 'Funding & Relocation',
                    description: 'We guide students through scholarships, education loans, and everything they need to settle smoothly in their new country.',
                },
            ],
        },
        {
            name: 'serviceStyles',
            type: 'group',
            fields: [...headingStyleFields],
        },
        {
            name: 'backgroundColor',
            type: 'text',
            defaultValue: '#D9F1FD',
            admin: {
                description: 'Background color for the service block',
            },
        },
    ],
};