import { Block } from 'payload';
import { link } from '@/fields/link'
export const IELTSEnroll: Block = {
    slug: 'ieltsEnroll',
    interfaceName: 'IELTSEnroll',
    imageURL: '/assets/blocks/IELTSEnroll.png',
    imageAltText: 'IELTSEnroll Image',
    labels: {
        singular: 'IELTS Enroll',
        plural: 'IELTS Enroll Blocks',
    },
    fields: [
        {
            name: 'titlePrefix',
            type: 'text',
            label: 'Title Prefix',
            defaultValue: 'Clear',
            required: true,
        },
        {
            name: 'titleEmphasis',
            type: 'text',
            label: 'Title Emphasis',
            defaultValue: 'IELTS',
            required: true,
        },
        {
            name: 'titleSuffix',
            type: 'text',
            label: 'Title Suffix',
            defaultValue: 'with Confidence',
            required: true,
        },
        link({
            appearances: false,
        }),
    ],
};