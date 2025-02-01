import { Block } from "payload";

export const GlobalUnivBlock: Block = {
    slug: 'globalUnivBlock',
    interfaceName: 'GlobalUnivBlock',
    labels: {
        singular: 'Global University Block',
        plural: 'Global University Blocks',
    },
    fields: [
        {
            name: 'universities',
            type: 'array',
            label: 'Universities',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'University Name',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'University Image',
                },
            ],
            admin: {
                description: 'Add universities with their images',
            },
        },
        {
            name: 'mapImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'World Map Image',
            admin: {
                description: 'Upload an image of the world map (recommended size: 1200x800)',
            },
        },
    ],
};