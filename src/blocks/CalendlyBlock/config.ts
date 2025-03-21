import { Block } from 'payload';

export const CalendlyBlock: Block = {
    slug: 'calendlyBlock',
    interfaceName: 'CalendlyBlock',
    imageURL: '/assets/blocks/CalendlyBlock.png',
    imageAltText: 'Calendly Block Image',
    labels: {
        singular: 'Calendly Booking',
        plural: 'Calendly Bookings',
    },
    fields: [
        {
            name: 'calendlyURL',
            type: 'text',
            label: 'Calendly Event URL',
            required: true,
            defaultValue: 'https://calendly.com/your-username/your-event',
            admin: {
                description: 'Enter your Calendly event URL here',
            },
        },
        {
            name: 'primaryColor',
            type: 'text',
            label: 'Primary Color',
            defaultValue: '#65558F',
            admin: {
                description: 'Primary color for the Calendly widget (HEX code)',
            },
        },
        {
            name: 'textColor',
            type: 'text',
            label: 'Text Color',
            defaultValue: '#000000',
            admin: {
                description: 'Text color for the Calendly widget (HEX code)',
            },
        },
    ],
};