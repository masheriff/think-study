import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/config'
import { CounselingBlock } from '@/blocks/CounselingBlock/config'
import { UniversitiesBlock } from '@/blocks/UniversitiesBlock/config'
import { StudyAbroadBlock } from '@/blocks/StudyAbroadBlock/config'
import { IELTSBlock } from '@/blocks/IELTSBlock/config'
import { GetStartedBlock } from '@/blocks/GetStartedBlock/config'
import { MapBlock } from '@/blocks/MapBlock/config'
import { ServiceBlock } from '@/blocks/ServiceBlock/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { AdmissionBlock } from '@/blocks/AdmissionBlock/config'
import { CareerBlock } from '@/blocks/CareerBlock/config'
import { WorldStudentBlock } from '@/blocks/WorldStudentBlock/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { CallToActionBlock } from '@/blocks/CallToActionBlock/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { ConnectBlock } from '@/blocks/ConnectBlock/config'
import { WhyusMediaBlock } from '@/blocks/WhyusMedia/conig'
import { hero } from '@/heros/config'

import { AppointmentBlock } from '@/blocks/AppointmentBlock/config'

// Study In Page
import { StudyInCourse } from '@/blocks/StudyInCourse/config'
import { StudyInChecklist } from '@/blocks/StudyInCheckList/config'
import { BenefitsInStudy } from '@/blocks/StudyInBenefits/config'
import { StudyInNotes } from '@/blocks/StudyInNotes/config'
import { StudyInApplication } from '@/blocks/StudyInApplication/config'

// import { StudyInApplication } from '@/blocks/StudyInApplication/config'




export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Content, MediaBlock, Archive, FormBlock, AdmissionBlock, TestimonialsBlock, CounselingBlock, CallToActionBlock, UniversitiesBlock, StudyAbroadBlock, IELTSBlock, GetStartedBlock, MapBlock, WorldStudentBlock, ServiceBlock, FAQBlock, CareerBlock, WhyusMediaBlock, ConnectBlock, AppointmentBlock, StudyInCourse, StudyInChecklist, BenefitsInStudy, StudyInNotes, StudyInApplication],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 2000, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
