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
            name: 'styles',
            type: 'group',
            fields: [
                {
                    name: 'titleStyles',
                    type: 'group',
                    fields: [
                        {
                            name: 'fontSize',
                            type: 'text',
                            defaultValue: '48px',
                            label: 'Font Size',
                        },
                        {
                            name: 'fontWeight',
                            type: 'select',
                            options: [
                                { label: 'Normal', value: 'normal' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'Bold', value: 'bold' },
                            ],
                            defaultValue: 'bold',
                        },
                        {
                            name: 'textAlign',
                            type: 'select',
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' },
                                { label: 'Right', value: 'right' },
                            ],
                            defaultValue: 'center',
                        },
                    ],
                },
                {
                    name: 'quesStyles',
                    type: 'group',
                    fields: [
                        {
                            name: 'fontSize',
                            type: 'text',
                            defaultValue: '18px',
                            label: 'Font Size',
                        },
                        {
                            name: 'fontWeight',
                            type: 'select',
                            options: [
                                { label: 'Normal', value: 'normal' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'Bold', value: 'bold' },
                            ],
                            defaultValue: 'medium',
                        },
                    ],
                },
            ],
        },
    ],
};