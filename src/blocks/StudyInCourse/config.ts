import { Block } from 'payload';

export const StudyInCourse: Block = {
    slug: 'studyInCourse',
    interfaceName: 'StudyInCourse',
    labels: {
        singular: 'Study In Course',
        plural: 'Study In Courses',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            defaultValue: 'Study in the',
        },

        {
            name: 'country',
            type: 'text',
            required: true,
            label: 'Country',
            defaultValue: 'USA',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Image',
        },

    ],
};