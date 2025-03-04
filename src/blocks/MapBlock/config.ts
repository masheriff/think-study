import { Block } from "payload/";

export const MapBlock: Block = {
    slug: 'mapBlock',
    interfaceName: 'MapBlock',
    imageURL: '/assets/blocks/MapBlock.png',
    imageAltText: 'MapBlock Image',
    labels: {
        singular: 'Map Block',
        plural: 'Map Blocks',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Heading',
            defaultValue: 'Visit Us'
        },
        {
            name: 'offices',
            type: 'array',
            label: 'Offices',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Office Name',
                },
                {
                    name: 'address',
                    type: 'textarea',
                    required: true,
                    label: 'Office Address',
                },
                {
                    name: 'mapIframe',
                    type: 'text',
                    required: true,
                    label: 'Map Iframe',
                    admin: {
                        description: 'Paste the iframe embed code for the map of this office',
                    },
                },
            ],
            admin: {
                description: 'Add office locations that will be displayed on the map',
            },
        },
    ],
};