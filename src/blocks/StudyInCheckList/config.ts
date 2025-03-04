import { Block } from 'payload';

export const StudyInChecklist: Block = {
    slug: 'studyInChecklist',
    interfaceName: 'StudyInChecklist',
    labels: {
        singular: 'Study In Checklist',
        plural: 'Study In Checklists',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            defaultValue: 'Your Essential Checklist!',
        },

        {
            name: 'subtitle',
            type: 'text',
            required: true,
            label: 'Subtitle',
            defaultValue: 'Reasons to Study in America',
        },
        {
            name: 'checkItems',
            type: 'array',
            label: 'Checklist Items',
            fields: [
                {
                    name: 'text',
                    type: 'textarea',
                    required: true,
                    label: 'Checklist Item Text',
                },

            ],
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