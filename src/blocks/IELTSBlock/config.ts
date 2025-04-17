import { Block } from "payload";
import { link } from '@/fields/link'

export const IELTSBlock: Block = {
    slug: 'ieltsBlock',
    interfaceName: 'IELTSBlock',
    imageURL: '/assets/blocks/IELTSBlock.png',
    imageAltText: 'IELTSBlock Image',
    labels: {
        singular: 'IELTS Block',
        plural: 'IELTS Blocks',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Main Title',
            defaultValue: 'Master English. Ace IELTS.',
        },
        {
            name: 'subtitle',
            type: 'text',
            required: true,
            label: 'Subtitle',
            defaultValue: 'Prep Smarter, Score Higher.',
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Description',
        },
        {
            name: 'ieltsText',
            type: 'text',
            required: true,
            label: 'IELTS Text',
            defaultValue: 'IELTS',
        },
        {
            name: 'ieltsImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'learningType',
            type: 'group',
            label: 'Learning Type',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Title',
                    defaultValue: 'Hybrid Learning',
                },
                {
                    name: 'subtitle',
                    type: 'text',
                    required: true,
                    label: 'Subtitle',
                    defaultValue: 'Classroom Or Online (Seamlessly Combined)',
                },
            ],
        },
        {
            name: 'studyModes',
            type: 'array',
            label: 'Study Modes',
            minRows: 1,
            maxRows: 3,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Mode Label',
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Mode Value',
                },
            ],
        },
        {
            name: 'features',
            type: 'array',
            label: 'Features',
            minRows: 1,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                    label: 'Feature Text',
                },
            ],
        },
        link({
            appearances: false,
        }),
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Featured Image',
        },
    ],
};