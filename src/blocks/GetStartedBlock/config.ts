import { Block } from "payload";

export const GetStartedBlock: Block = {
    slug: 'getStartedBlock',
    interfaceName: 'GetStartedBlock',
    imageURL: '/assets/blocks/GetStartedBlock.png',
    imageAltText: 'GetStartedBlock Image',
    labels: {
        singular: 'Get Started Block',
        plural: 'Get Started Blocks',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Small Heading',
            defaultValue: "Let's make it happen!"
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Main Title',
            defaultValue: 'Start your journey today!'
        },
        {
            name: 'features',
            type: 'array',
            label: 'Feature List',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                    label: 'Feature Text',
                },
            ],
            admin: {
                description: 'Add features that will be displayed with bullet points',
            },
        },
        {
            name: 'footerText',
            type: 'text',
            label: 'Footer Text',
            required: true,
            defaultValue: 'And so much more to make your journey hassle-free!',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Graduate Image',
            admin: {
                description: 'Upload an image of a graduate student (recommended size: 600x800)',
            },
        },
    ],
};