import { Block } from 'payload';

export const IELTSPrep: Block = {
    slug: 'ieltsPrep',
    interfaceName: 'IELTSPrep',
    imageURL: '/assets/blocks/IELTSPrep.png',
    imageAltText: 'IELTSPrep Image',
    labels: {
        singular: 'IELTS Prep',
        plural: 'IELTS Prep Blocks',
    },
    fields: [
        {
            name: 'normalHeading',
            type: 'text',
            label: 'Normal Heading',
            required: true,
        },
        {
            name: 'highlightedHeading',
            type: 'text',
            label: 'Highlighted Heading',
            required: true,
        },
        {
            name: 'normalDescription',
            type: 'text',
            label: 'Normal Description',
            required: true,
            admin: {
                description: 'Enter the text inside "|" symbols to highlight text in black color. Example: "Regular text |highlighted text| regular text"',
            },
        },
        {
            name: 'contentCard',
            type: 'textarea',
            label: 'Content Card',
            required: true,
            admin: {
                description: 'Enter the text inside "|" symbols to highlight text in black color. Example: "Regular text |highlighted text| regular text"',
            },
        },
        {
            name: 'iconCards',
            type: 'array',
            label: 'Icon Cards',
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Icon',
                    required: true,
                },
                {
                    name: 'text',
                    type: 'text',
                    label: 'Text',
                    required: true,
                },
            ],
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
            required: true,
        },
    ],
};