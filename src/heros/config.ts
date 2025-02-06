import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

const textStyleFields: Field[] = [
  {
    name: 'fontFamily',
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
    name: 'fontSize',
    type: 'text',
    defaultValue: '1rem',
    admin: {
      description: 'Enter value with unit (e.g., 2rem, 24px)',
    },
  },
  {
    name: 'textColor',
    type: 'text',
    defaultValue: '#000000',
    admin: {
      description: 'Hex color code (e.g., #FFFFFF)',
    },
  },
]

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
      ],
      required: true,
    },
    {
      name: 'heading',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        ...textStyleFields,
      ],
    },
    {
      name: 'description',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        ...textStyleFields,
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
    },
    {
      name: 'bottomText',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        ...textStyleFields,
      ],
    },
  ],
}
