import { Block } from 'payload';

export const StudyInApplication: Block = {
    slug: 'studyInApplication',
    interfaceName: 'StudyInApplication',
    labels: {
        singular: 'Study In Application',
        plural: 'Study In Applications',
    },
    fields: [
        {
            name: 'mainTitle',
            type: 'text',
            label: 'Main Title',
            defaultValue: 'From Application to Admission - We\'ve Got You!',
            required: true,
        },
        {
            name: 'subTitle',
            type: 'text',
            label: 'Sub Title',
            defaultValue: 'Think. Study. Succeed. - We Make Your Global Education Dream a Reality!',
            required: true,
        },
        {
            name: 'leftContent',
            type: 'group',
            label: 'Left Content',
            fields: [
                {
                    name: 'headline',
                    type: 'text',
                    label: 'Headline',
                    defaultValue: 'Studying abroad can be complex, but we make it effortless.',
                    required: true,
                },
                {
                    name: 'highlight',
                    type: 'text',
                    label: 'Hightlight',
                    defaultValue: 'Our expert mentors',
                    required: true,
                },
                {
                    name: 'subheadline',
                    type: 'text',
                    label: 'Subheadline',
                    defaultValue: 'guide you every step of the way.',
                    required: true,
                },
            ],
        },
        {
            name: 'rightContent',
            type: 'group',
            label: 'Right Content',
            fields: [
                {
                    name: 'services',
                    type: 'array',
                    label: 'Services',
                    minRows: 1,
                    fields: [
                        {
                            name: 'serviceText',
                            type: 'text',
                            label: 'Service Text',
                            required: true,
                        },
                    ],
                    defaultValue: [
                        { serviceText: 'Find Your Perfect Program' },
                        { serviceText: 'Shortlist Smartly' },
                        { serviceText: 'Stand Out in Applications' },
                        { serviceText: 'Seamless Visa & Application Process' },
                        { serviceText: 'Financial & Travel Assistance' },
                    ],
                },
            ],
        },
    ],
};