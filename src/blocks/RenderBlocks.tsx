import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { CallToActionBlock } from './CallToAction/Component'
import { FormBlock } from './Form/Component'
import { MediaBlock } from './MediaBlock/Component'
import { AppointmentBlock } from './AppointmentBlock/Component'
import TestimonialsBlock from './TestimonialsBlock/Component'
import CounselingBlock from './CounselingBlock/Component'
import UniversitiesBlock from './UniversitiesBlock/Component'
import { StudyAbroadBlock } from './StudyAbroadBlock/Component'
import IELTSBlock from './IELTSBlock/Component'
import GetStartedBlock from './GetStartedBlock/Component'
import MapBlock from './MapBlock/Component'
import CTABlock from './CTABlock/Component'
import GlobalUnivBlock from './GlobalUnivBlock/Component'
import { WorldStudentBlock } from './WorldStudentBlock/Component'
import ServiceBlock from './ServiceBlock/Component'
import FAQBlock from './FAQBlock/Component'
import FutureBlock from './FutureBlock/Component'
import AdminssionBlock from './AdmissionBlock/Component'
import careerBlock from './CareerBlock/Component'




type BlockComponentsType = {
  cta: typeof CallToActionBlock
  formBlock: typeof FormBlock
  mediaBlock: typeof MediaBlock
  appointmentBlock: typeof AppointmentBlock
  testimonialsBlock: typeof TestimonialsBlock
  counselingBlock: typeof CounselingBlock
  universitiesBlock: typeof UniversitiesBlock
  studyAbroadBlock: typeof StudyAbroadBlock
  ieltsBlock: typeof IELTSBlock
  getStartedBlock: typeof GetStartedBlock
  mapBlock: typeof MapBlock
  ctaBlock: typeof CTABlock
  globalUnivBlock: typeof GlobalUnivBlock
  worldStudentBlock: typeof WorldStudentBlock
  serviceBlock: typeof ServiceBlock
  faqBlock: typeof FAQBlock
  futureBlock: typeof FutureBlock
  adminssionBlock: typeof AdminssionBlock
  careerBlock: typeof careerBlock


}

const blockComponents: BlockComponentsType = {
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  appointmentBlock: AppointmentBlock,
  testimonialsBlock: TestimonialsBlock,
  counselingBlock: CounselingBlock,
  universitiesBlock: UniversitiesBlock,
  studyAbroadBlock: StudyAbroadBlock,
  ieltsBlock: IELTSBlock,
  getStartedBlock: GetStartedBlock,
  mapBlock: MapBlock,
  ctaBlock: CTABlock,
  globalUnivBlock: GlobalUnivBlock,
  worldStudentBlock: WorldStudentBlock,
  serviceBlock: ServiceBlock,
  faqBlock: FAQBlock,
  futureBlock: FutureBlock,
  adminssionBlock: AdminssionBlock,
  careerBlock: careerBlock

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
            <div className="my-0" key={index}>
              <Block {...(block as any)} disableInnerContainer />
            </div>
          )
        }
        return null
      })}
    </Fragment>
  )
}
