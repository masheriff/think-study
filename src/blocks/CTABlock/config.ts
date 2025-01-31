import { Block } from 'payload';

export const CTABlock: Block = {
    slug: 'ctaBlock',
    interfaceName: 'CTABlock',
    fields: [
        {
            name: 'phoneNumbers',
            type: 'array',
            label: 'Phone Numbers',
            fields: [
                {
                    name: 'number',
                    type: 'text',
                    label: 'Phone Number',
                },
            ],
        },
        {
            name: 'offices',
            type: 'array',
            label: 'Offices',
            fields: [
                {
                    name: 'location',
                    type: 'text',
                    label: 'Office Location',
                },
            ],
        },
        {
            name: 'tagline',
            type: 'text',
            label: 'Tagline',
        },
        {
            name: 'image',
            type: 'upload',
            label: 'Image',
            relationTo: 'media',
        },
        {
            name: 'brandLogo',
            type: 'upload',
            label: 'Brand Logo',
            relationTo: 'media',
        }
    ],
};