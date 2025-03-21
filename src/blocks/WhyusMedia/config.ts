import type { Block } from 'payload'

export const WhyusMediaBlock: Block = {
    slug: 'whyusMediaBlock',
    interfaceName: 'WhyusMediaBlock',
    imageURL: '/assets/blocks/WhyUsMediaBlock.png',
    imageAltText: 'WhyusMediaBlock Image',
    fields: [
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
}
