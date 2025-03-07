/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { FormBlock } from './Form/Component'
import { MediaBlock } from './MediaBlock/Component'
import TestimonialsBlock from './TestimonialsBlock/Component'
import CounselingBlock from './CounselingBlock/Component'
import UniversitiesBlock from './UniversitiesBlock/Component'
import { StudyAbroadBlock } from './StudyAbroadBlock/Component'
import IELTSBlock from './IELTSBlock/Component'
import GetStartedBlock from './GetStartedBlock/Component'
import MapBlock from './MapBlock/Component'
import { WorldStudentBlock } from './WorldStudentBlock/Component'
import FAQBlock from './FAQBlock/Component'
import { CareerBlock } from './CareerBlock/Component'
import ConnectBlock from './ConnectBlock/Component'
import WhyusMediaBlock from './WhyusMedia/Component'
import ServiceBlock from './ServiceBlock/Component'
import { StudyInCourse } from './StudyInCourse/Component'
import StudyInChecklist from './StudyInCheckList/Component'
import { BenefitsInStudy } from './StudyInBenefits/Comonent'
import CallToActionBlock from './CallToActionBlock/Component'
import { StudyInNotes } from './StudyInNotes/Component'
import { StudyInApplication } from './StudyInApplication/Component'
import AdmissionBlock from './AdmissionBlock/Component'
import { IELTSEnroll } from './IELTSEnroll/Component'
import { IELTSPrep } from './IELTSPrep/Component'
import { IELTSFeatures } from './IELTSFeatures/Component'
import { IELTSPackages } from './IELTSPackages/Component'
import { IELTSRoadmap } from './IELTSRoadmap/Component'
import AppointmentBlock from './AppointmentBlock/Component'


type BlockComponentsType = {
  formBlock: typeof FormBlock
  mediaBlock: typeof MediaBlock
  testimonialsBlock: typeof TestimonialsBlock
  counselingBlock: typeof CounselingBlock
  universitiesBlock: typeof UniversitiesBlock
  studyAbroadBlock: typeof StudyAbroadBlock
  ieltsBlock: typeof IELTSBlock
  getStartedBlock: typeof GetStartedBlock
  mapBlock: typeof MapBlock
  worldStudentBlock: typeof WorldStudentBlock
  serviceBlock: typeof ServiceBlock
  faqBlock: typeof FAQBlock
  admissionBlock: typeof AdmissionBlock
  connectBlock: typeof ConnectBlock
  whyusMediaBlock: typeof WhyusMediaBlock
  careerBlock: typeof CareerBlock
  callToActionBlock: typeof CallToActionBlock
  studyInCourse: typeof StudyInCourse
  studyInChecklist: typeof StudyInChecklist
  benefitsInStudy: typeof BenefitsInStudy
  studyInNotes: typeof StudyInNotes
  studyInApplication: typeof StudyInApplication
  ieltsEnroll: typeof IELTSEnroll
  ieltsPrep: typeof IELTSPrep
  ieltsFeatures: typeof IELTSFeatures
  ieltsPackages: typeof IELTSPackages
  ieltsRoadmap: typeof IELTSRoadmap
  appointmentBlock: typeof AppointmentBlock
}

const blockComponents: BlockComponentsType = {
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  testimonialsBlock: TestimonialsBlock,
  counselingBlock: CounselingBlock,
  universitiesBlock: UniversitiesBlock,
  studyAbroadBlock: StudyAbroadBlock,
  ieltsBlock: IELTSBlock,
  getStartedBlock: GetStartedBlock,
  mapBlock: MapBlock,
  worldStudentBlock: WorldStudentBlock,
  serviceBlock: ServiceBlock,
  faqBlock: FAQBlock,
  admissionBlock: AdmissionBlock,
  careerBlock: CareerBlock,
  connectBlock: ConnectBlock,
  whyusMediaBlock: WhyusMediaBlock,
  callToActionBlock: CallToActionBlock,
  studyInCourse: StudyInCourse,
  studyInChecklist: StudyInChecklist,
  benefitsInStudy: BenefitsInStudy,
  studyInNotes: StudyInNotes,
  studyInApplication: StudyInApplication,
  ieltsEnroll: IELTSEnroll,
  ieltsPrep: IELTSPrep,
  ieltsFeatures: IELTSFeatures,
  ieltsPackages: IELTSPackages,
  ieltsRoadmap: IELTSRoadmap,
  appointmentBlock: AppointmentBlock
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof BlockComponentsType]
          return (
            <div className="my-28" key={index}>
              <Block {...(block as any)} disableInnerContainer />
            </div>
          )
        }
        return null
      })}
    </Fragment>
  )
}
