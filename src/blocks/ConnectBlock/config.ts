import { Block } from 'payload';
import { link } from '@/fields/link'

export const ConnectBlock: Block = {
    slug: 'connectBlock',
    interfaceName: 'ConnectBlock',
    imageURL: '/assets/blocks/ConnectBlock.png',
    imageAltText: 'ConnectBlock Image',
    labels: {
        singular: 'Connect Block',
        plural: 'Connect Blocks',
    },
    fields: [
        {
            name: 'mainHeading',
            type: 'text',
            required: true,
            defaultValue: 'Your future is having global skills — lets make studying abroad happen!',
        },
        {
            name: 'connectText',
            type: 'text',
            required: true,
            defaultValue: 'connect with our team today!',
        },
        link({
            appearances: false,
        }),
    ],
};