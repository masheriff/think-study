import type { Field } from 'payload'
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
]

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'highImpact',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
      ],
      required: true,
    },
    {
      name: 'heading',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'textarea',
          admin: {
            description: 'Enter the text inside "|" symbols to highlight text in red. Example: "Regular text |highlighted text| regular text"',
          },
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
          type: 'text',
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
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
    },
  ],
}