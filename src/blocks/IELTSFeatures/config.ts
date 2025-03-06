import { Block } from 'payload';

export const IELTSFeatures: Block = {
    slug: 'ieltsFeatures',
    interfaceName: 'IELTSFeatures',
    imageURL: '/assets/blocks/IELTSFeatures.png',
    imageAltText: 'IELTSFeatures Image',
    labels: {
        singular: 'IELTS Features',
        plural: 'IELTS Features Blocks',
    },
    fields: [
        {
            name: 'Heading',
            type: 'text',
            label: 'Heading',
            required: true,
        },
        {
            name: 'featuresList',
            type: 'array',
            label: 'Features List',
            fields: [
                {
                    name: 'featureText',
                    type: 'text',
                    label: 'Feature Text',
                    required: true,
                },
            ],
            minRows: 4,
            maxRows: 4,
        },
        {
            name: 'studentImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Student Image',
            required: true,
        },
    ],
};