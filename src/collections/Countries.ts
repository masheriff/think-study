import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Countries: CollectionConfig = {
    slug: 'countries',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: 'Country',
        plural: 'Countries',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Name of the country',
                    }
                },
                {
                    name: 'code',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'ISO 3166-1 alpha-2 code | https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements',
                    }
                }
            ]
        }
    ],
};
