import { Block } from 'payload';

export const IELTSEnroll: Block = {
    slug: 'ieltsEnroll',
    interfaceName: 'IELTSEnroll',
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
        {
            name: 'buttonText',
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Enroll Now!',
            required: true,
        },
    ],
};