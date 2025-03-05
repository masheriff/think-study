import { Block } from 'payload';

export const IELTSPackages: Block = {
    slug: 'ieltsPackages',
    interfaceName: 'IELTSPackages',
    labels: {
        singular: 'IELTS Packages',
        plural: 'IELTS Packages Blocks',
    },
    fields: [
        {
            name: 'mainHeading',
            type: 'text',
            label: 'Main Heading',
            required: true,
        },
        {
            name: 'higlightedHeading',
            type: 'text',
            label: 'Higlighted Heading',
            required: true,
        },
        {
            name: 'description',
            type: 'text',
            label: 'Description',
            required: true,
        },
        {
            name: 'currencyLabel',
            type: 'text',
            label: 'Currency Label',
            required: true,
            defaultValue: 'INR',
        },
        {
            name: 'enrollButtonText',
            type: 'text',
            label: 'Enroll Button Text',
            required: true,
            defaultValue: 'Enroll Now',
        },
        {
            name: 'packages',
            type: 'array',
            label: 'Packages',
            fields: [
                {
                    name: 'optionLabel',
                    type: 'text',
                    label: 'Option Label',
                    required: true,
                },
                {
                    name: 'packageTitle',
                    type: 'text',
                    label: 'Package Title',
                    required: true,
                },
                {
                    name: 'details',
                    type: 'array',
                    label: 'Package Details',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            label: 'Label',
                            required: true,
                        },
                        {
                            name: 'text',
                            type: 'text',
                            label: 'Text',
                            required: true,
                        }
                    ],
                    minRows: 3,
                    maxRows: 3,
                },
                {
                    name: 'includesHeading',
                    type: 'text',
                    label: 'Includes Heading',
                    required: true,
                    defaultValue: 'Includes:'
                },
                {
                    name: 'includes',
                    type: 'array',
                    label: 'Includes',
                    fields: [
                        {
                            name: 'includeItem',
                            type: 'text',
                            label: 'Include Item',
                            required: true,
                        }
                    ]
                },
                {
                    name: 'price',
                    type: 'number',
                    label: 'Price',
                    required: true,
                },
                {
                    name: 'packageColor',
                    type: 'select',
                    label: 'Package Color',
                    options: [
                        { label: 'Green', value: 'green' },
                        { label: 'Yellow', value: 'yellow' }
                    ],
                    required: true,
                }
            ],
            minRows: 3,
            maxRows: 3,
        }
    ],
};