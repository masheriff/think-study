import { Block } from "payload";

export const UniversitiesBlock: Block = {
    slug: 'universitiesBlock',
    interfaceName: 'UniversitiesBlock',
    labels: {
        singular: 'Universities Block',
        plural: 'Universities Blocks',
    },
    fields: [
        {
            name: 'mainHeading',
            type: 'text',
            required: true,
            label: 'Main Heading',
        },
        {
            name: 'subHeading',
            type: 'text',
            required: true,
            label: 'Sub Heading',
        },
        {
            name: 'description',
            type: 'text',
            required: true,
            label: 'Description',
        },
        {
            name: 'stats',
            type: 'array',
            label: 'Statistics',
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Statistic Value',
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Statistic Label',
                },
            ],
        },
        {
            name: 'universitiesImages', // Updated field name to plural
            type: 'array',
            label: 'University Images',
            minRows: 1,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'Image',
                },
            ],
        },
    ],
};