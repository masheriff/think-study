import { Block } from 'payload';

export const IELTSRoadmap: Block = {
    slug: 'ieltsRoadmap',
    interfaceName: 'IELTSRoadmap',
    imageURL: '/assets/blocks/IELTSRoadmap.png',
    imageAltText: 'IELTSRoadmap Image',
    labels: {
        singular: 'IELTS Roadmap',
        plural: 'IELTS Roadmap Blocks',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'subtitle',
            type: 'text',
        },
        {
            name: 'steps',
            type: 'array',
            fields: [
                {
                    name: 'stepNumber',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
};