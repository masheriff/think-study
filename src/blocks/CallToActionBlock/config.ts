import { Block } from 'payload';


export const CallToActionBlock: Block = {
    slug: 'callToActionBlock',
    interfaceName: 'CallToActionBlock',
    imageURL: '/assets/blocks/CallToActionBlock.png',
    imageAltText: 'CallToActionBlock Image',
    labels: {
        singular: 'Call To Action Block',
        plural: 'Call To Action Blocks',
    },
    fields: [

        {
            name: 'callText',
            type: 'text',
            required: true,
            defaultValue: 'Call or WhatsApp',
        },
        {
            name: 'studentImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'logoImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'offices',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'phoneNumbers',
                    type: 'array',
                    required: true,
                    fields: [
                        {
                            name: 'number',
                            type: 'text',
                            required: true,
                        }
                    ]
                }
            ],
            defaultValue: [
                {
                    name: 'Chennai Office',
                    phoneNumbers: [
                        { number: '9169169494' },
                        { number: '9025186185' }
                    ]
                },
                {
                    name: 'Tirupati Office',
                    phoneNumbers: [
                        { number: '9169169494' },
                        { number: '9025186185' }
                    ]
                }
            ]
        },
    ],
};