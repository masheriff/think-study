import type { Block } from "payload"


export const StudyAbroadBlock: Block = {
    slug: "studyAbroadBlock",
    interfaceName: "StudyAbroadBlock",
    imageURL: '/assets/blocks/StudyAbroadBlock.png',
    imageAltText: 'StudyAbroadBlock Image',
    labels: {
        singular: "Study Abroad Block",
        plural: "Study Abroad Blocks",
    },
    fields: [
        {
            name: "heading",
            type: "text",
            required: true,
        },
        {
            name: "subheading",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            required: true,
        },
        {
            name: "title",
            type: "group",
            fields: [
                {
                    name: "content",
                    type: "text",
                    required: true,
                },
            ],
        },
        {
            name: "titleDescription",
            type: "textarea",
            required: true,
        },
        {
            name: "cards",
            type: "array",
            fields: [
                {
                    name: "courseDescription",
                    type: "textarea",
                    required: true,
                },
                {
                    name: "description",
                    type: "text",
                    required: true,
                },
                {
                    name: "buttonText",
                    type: "text",
                    required: true,
                    defaultValue: "Get Course List",
                },
                {
                    name: "buttonLink",
                    type: "text",
                    required: true,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "imagePosition",
                    type: "select",
                    options: [
                        { label: "Left", value: "left" },
                        { label: "Right", value: "right" },
                    ],
                    defaultValue: "right",
                    required: true,
                },
            ],
        },
        {
            name: 'backgroundColor',
            type: 'select',
            label: 'Background Color',
            options: [
                { label: 'Blue', value: 'blue' },
                { label: 'White', value: 'white' }
            ],
            required: true,
            admin: {
                description: 'Choose the background here'
            }
        }
    ],
}