import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: '© 2024 Your Company Name. All rights reserved.',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services Column',
      fields: [link({ appearances: false })],
      maxRows: 6,
      admin: { initCollapsed: true },
    },
    {
      name: 'about',
      type: 'array',
      label: 'About Column',
      fields: [link({ appearances: false })],
      maxRows: 6,
      admin: { initCollapsed: true },
    },
    {
      name: 'help',
      type: 'array',
      label: 'Help Column',
      fields: [link({ appearances: false })],
      maxRows: 6,
      admin: { initCollapsed: true },
    },
    {
      name: 'legal',
      type: 'array',
      label: 'Legal Links',
      fields: [link({ appearances: false })],
      maxRows: 3,
    },
    {
      name: 'social',
      type: 'array',
      label: 'Social Media',
      fields: [link({
        appearances: false,
        overrides: {
          label: false,
        }
      })],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}