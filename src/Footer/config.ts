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
      name: 'whatsappButton',
      type: 'group',
      label: 'WhatsApp Button',
      fields: [
        {
          name: 'showButton',
          type: 'checkbox',
          label: 'Show WhatsApp Button',
          defaultValue: true,
          admin: {
            description: 'Enable to show the WhatsApp button on the website.',
          },
        },
        {
          type: 'row',
          admin: {
            condition: (_, siblingData) => siblingData?.showButton === true,
          },
          fields: [
            {
              name: 'phoneNumber',
              type: 'number',
              label: 'WhatsApp Phone Number',
              required: true,
              admin: {
                width: '50%',
                description: 'Enter the phone number in international format (e.g., 919025186185).',
              },
              defaultValue: 919025186185,
            },
            {
              name: 'message',
              type: 'text',
              label: 'WhatsApp Message',
              required: true,
              admin: {
                width: '50%',
                description: 'Enter the default message to be sent when the button is clicked.',
              },
              defaultValue: 'Hello, I have a question regarding your services.',
            },
          ]
        },
      ]
    },
    {
      name: 'callToAction',
      type: 'group',
      label: 'Call-to-Action Box',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Currently studying?',
              admin: {
                width: '50%',
              }
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              defaultValue: 'Become a mentor and help students.',
              admin: {
                width: '50%',
              }
            },
            link({
              appearances: false,
            })
          ]
        },

      ],
    },
    {
      name: 'navigationLinks',
      type: 'array',
      label: 'Navigation Links',
      fields: [link({ appearances: false })],
      maxRows: 10,
      admin: { initCollapsed: true },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      fields: [link({ appearances: false })],
      maxRows: 3,
      admin: { initCollapsed: true },
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phoneNumbers',
          type: 'array',
          label: 'Phone Numbers',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: false,
            }
          ],
          admin: { initCollapsed: true },
          defaultValue: [
            {
              number: '+91 90251 86185',
              label: 'Main Office'
            }
          ],
        },
        {
          name: 'emails',
          type: 'array',
          label: 'Email Addresses',
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: false,
            }
          ],
          admin: { initCollapsed: true },
          defaultValue: [
            {
              email: 'contactus@think.study',
              label: 'General Inquiries'
            },
            {
              email: 'chennaioffice@think.study',
              label: 'Chennai Office'
            }
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      label: 'Social Media',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 4,
    },
    {
      name: 'copyrightSection',
      type: 'group',
      label: 'Copyright Section',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: '© {year} Think Study. All rights reserved.',
          admin: {
            description: 'Use {year} as a placeholder for the current year',
          },
        },
        {
          name: 'showPoweredBy',
          type: 'checkbox',
          label: 'Show "Powered by" text',
          defaultValue: true,
        },
        {
          name: 'poweredByText',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData?.showPoweredBy === true,
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              defaultValue: 'Powered by:',
            },
            link({
              appearances: false,
              overrides: {
                admin: {
                  description: 'Link for the powered by text',
                },
              },
            })
          ],
        }
      ],
    }
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}