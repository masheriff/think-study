import { Block, Field } from 'payload';

const faqItemFields: Field[] = [
    {
        name: 'question',
        type: 'text',
        required: true,
        label: 'Question',
    },
    {
        name: 'answer',
        type: 'textarea',
        required: true,
        label: 'Answer',
    }
];

export const FAQBlock: Block = {
    slug: 'faqBlock',
    interfaceName: 'FAQBlock',
    imageURL: '/assets/blocks/FAQBlock.png',
    imageAltText: 'FAQBlock Image',
    labels: {
        singular: 'FAQ Block',
        plural: 'FAQ Blocks',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'FAQs',
            label: 'Title',
        },
        {
            name: 'faqs',
            type: 'array',
            label: 'FAQ Items',
            required: true,
            minRows: 1,
            fields: faqItemFields,
            admin: {
                description: 'Add FAQ items with questions and answers',
            },
        },
        {
            name: 'bottomImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
};