import { Block } from 'payload';


export const ConnectBlock: Block = {
    slug: 'connectBlock',
    interfaceName: 'ConnectBlock',
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
        {
            name: 'buttonText',
            type: 'text',
            required: true,
            defaultValue: 'Schedule Counseling',
        },
    ],
};