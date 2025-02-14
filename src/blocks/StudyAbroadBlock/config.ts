import type { Block, Field } from "payload"

const textStyleFields: Field[] = [
    {
        name: 'font',
        type: 'select',
        options: [
            { label: 'Inter', value: 'Inter' },
            { label: 'Roboto', value: 'Roboto' },
            { label: 'Open Sans', value: 'Open Sans' },
            { label: 'Montserrat', value: 'Montserrat' },
        ],
        defaultValue: 'Inter',
    },
    {
        name: 'size',
        type: 'text',
        defaultValue: '1rem',
        admin: {
            description: 'Enter value with unit (e.g., 2rem, 24px)',
        },
    },
]

export const StudyAbroadBlock: Block = {
    slug: "studyAbroadBlock",
    interfaceName: "StudyAbroadBlock",
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
                ...textStyleFields,
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
    ],
}