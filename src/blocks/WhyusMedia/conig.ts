import type { Block } from 'payload'

export const WhyusMediaBlock: Block = {
    slug: 'whyusMediaBlock',
    interfaceName: 'WhyusMediaBlock',
    fields: [
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
}
