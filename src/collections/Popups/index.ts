import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidatePopup, revalidatePopupDelete } from './hooks/revalidatePopup'
import {
  AlignFeature,
  UnorderedListFeature,
  OrderedListFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { revalidateDelete, revalidatePage } from '../Pages/hooks/revalidatePage'

export const Popups: CollectionConfig = {
  slug: 'popups',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'active', 'trigger', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Controls whether this popup is active and can be displayed on the site',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'media',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'Add media to the top of your popup',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  return [
                    ...defaultFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    AlignFeature(),
                    UnorderedListFeature(),
                    OrderedListFeature(),
                  ]
                },
              }),
              admin: {
                description: 'Content for your popup',
              },
            },
            {
              name: 'includeForm',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Include a form in this popup',
              },
            },
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              required: false,
              admin: {
                condition: (data) => data.includeForm === true,
                description: 'Select a form to include in this popup',
              },
            },
          ],
        },
        {
          label: 'Display Settings',
          fields: [
            {
              name: 'trigger',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'On Page Load',
                  value: 'pageLoad',
                },
                {
                  label: 'Exit Intent',
                  value: 'exitIntent',
                },
                {
                  label: 'On Button Click',
                  value: 'buttonClick',
                },
                {
                  label: 'After Time Delay',
                  value: 'timeDelay',
                },
              ],
              defaultValue: 'pageLoad',
            },
            {
              name: 'delay',
              type: 'number',
              min: 1,
              max: 300,
              defaultValue: 5,
              admin: {
                description: 'Delay in seconds before showing the popup (1-300 seconds)',
                condition: (data) => data.trigger === 'timeDelay',
              },
            },
            {
              name: 'frequency',
              type: 'select',
              options: [
                {
                  label: 'Every Visit',
                  value: 'everyVisit',
                },
                {
                  label: 'Once Per Session',
                  value: 'oncePerSession',
                },
                {
                  label: 'Once Every 24 Hours',
                  value: 'once24Hours',
                },
                {
                  label: 'Once Every 7 Days',
                  value: 'once7Days',
                },
                {
                  label: 'Once Ever (Uses Cookies)',
                  value: 'onceEver',
                },
              ],
              defaultValue: 'oncePerSession',
              admin: {
                description:
                  'Controls how often the popup appears to users. For button-triggered popups, this limits how often the button will actually display the popup when clicked.',
              },
            },
            {
              name: 'displayOnPages',
              type: 'relationship',
              relationTo: 'pages',
              hasMany: true,
              admin: {
                description:
                  'Select which pages this popup should appear on. Leave empty to show on all pages.',
              },
            },
            {
              name: 'excludeOnPages',
              type: 'relationship',
              relationTo: 'pages',
              hasMany: true,
              admin: {
                description: 'Select which pages this popup should NOT appear on',
              },
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              name: 'appearance',
              type: 'group',
              fields: [
                {
                  name: 'width',
                  type: 'select',
                  options: [
                    { label: 'Small', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Large', value: 'large' },
                    { label: 'Full Screen', value: 'fullScreen' },
                  ],
                  defaultValue: 'medium',
                },
                {
                  name: 'position',
                  label: 'Position',
                  type: 'select',
                  options: [
                    {
                      label: 'Center',
                      value: 'center',
                    },
                    {
                      label: 'Top',
                      value: 'top',
                    },
                    {
                      label: 'Bottom',
                      value: 'bottom',
                    },
                  ],
                  defaultValue: 'center',
                },
                {
                  name: 'showCloseButton',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'closeOnBackgroundClick',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'animation',
                  type: 'select',
                  options: [
                    { label: 'Fade', value: 'fade' },
                    { label: 'Slide Up', value: 'slideUp' },
                    { label: 'Slide Down', value: 'slideDown' },
                    { label: 'Zoom In', value: 'zoomIn' },
                  ],
                  defaultValue: 'fade',
                },
                {
                  name: 'backgroundColor',
                  type: 'select',
                  label: 'Background Color',
                  options: [
                    { label: 'Green', value: 'green' },
                    { label: 'Blue', value: 'blue' },
                    { label: 'White', value: 'white' },
                  ],
                  defaultValue: 'green',
                  admin: {
                    description: 'Choose the background color for this popup',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage, revalidatePopup],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete, revalidatePopupDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
