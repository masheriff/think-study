import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BookAppointment: Block = {
  slug: 'bookAppointment',
  interfaceName: 'BookAppointmentBlock',
  fields: [
    {
      name: 'mainContent',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          required: true,
        },
        {
          name: 'btn',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'schedule',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'select',
          options: [
            { label: 'Monday', value: 'mon' },
            { label: 'Tuesday', value: 'tue' },
            { label: 'Wednesday', value: 'wed' },
            { label: 'Thursday', value: 'thu' },
            { label: 'Friday', value: 'fri' },
            { label: 'Saturday', value: 'sat' },
            { label: 'Sunday', value: 'sun' },
          ],
        },
        {
          name: 'slots',
          type: 'array',
          fields: [
            {
              name: 'start',
              type: 'text',
              required: true,
            },
            {
              name: 'end',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'info',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'media',
          type: 'array',
          fields: [
            {
              name: 'img',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'alt',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
