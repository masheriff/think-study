import { Block } from 'payload';

export const AdmissionBlock: Block = {
    slug: 'admissionBlock',
    interfaceName: 'AdmissionBlock',
    imageURL: '/assets/blocks/AdmissionBlock.png',
    imageAltText: 'AdmissionBlock Image',
    labels: {
        singular: 'Admission Block',
        plural: 'Admission Blocks',
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
    ],
};
