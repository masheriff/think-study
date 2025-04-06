import { Block } from 'payload'

export const ContactUsBlock: Block = {
    slug: 'contactUsBlock',
    interfaceName: 'ContactUsBlock',
    imageURL: '/assets/blocks/ContactUsBlock.png',
    imageAltText: 'ContactUsBlock Image',
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'text',
            required: true,
        },
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
            admin: {
                description: 'Select a form to include in this block',
            },
        },
    ],
}