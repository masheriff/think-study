import { Block } from 'payload';

export const BenefitsInStudy: Block = {
    slug: 'benefitsInStudy',
    imageURL: '/assets/blocks/StudyIn-Abord.svg',
    imageAltText: 'Study In Benefits',
    labels: {
        singular: 'Study In Benefits',
        plural: 'Study In Benefits Blocks',
    },
    fields: [
        {
            name: 'backgroundImage',
            label: 'Background Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'benefitsDescription',
            label: 'Benefits Description',
            type: 'text',
            required: true,
            defaultValue: 'Studying in the USA gives international students a chance to experience top-quality education in a welcoming and diverse environment. American universities are famous for their high teaching standards, modern facilities, and a wide selection of courses and degrees. Students gain practical knowledge, improve their English skills, and learn how to adapt to different cultures. The USA also offers excellent career prospects and strong student support services. With its vibrant campus life and numerous opportunities, studying in America is an attractive choice for students around the world.',
        },
    ],
};