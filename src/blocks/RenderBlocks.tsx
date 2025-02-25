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
import FutureBlock from './FutureBlock/Component'
import AdminssionBlock from './AdmissionBlock/Component'
import { CareerBlock } from './CareerBlock/Component'
import ConnectBlock from './ConnectBlock/Component'
import WhyusMediaBlock from './WhyusMedia/Component'
import ServiceBlock from './ServiceBlock/Component'
import AppointmentBlock from './AppointmentBlock/Component'
import CallActionBlock from './CallActionBlock/Component'



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
  futureBlock: typeof FutureBlock
  adminssionBlock: typeof AdminssionBlock
  connectBlock: typeof ConnectBlock
  whyusMediaBlock: typeof WhyusMediaBlock
  appointmentBlock: typeof AppointmentBlock
  careerBlock: typeof CareerBlock
  callActionBlock: typeof CallActionBlock
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
  futureBlock: FutureBlock,
  adminssionBlock: AdminssionBlock,
  careerBlock: CareerBlock,
  connectBlock: ConnectBlock,
  whyusMediaBlock: WhyusMediaBlock,
  appointmentBlock: AppointmentBlock,
  callActionBlock: CallActionBlock

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
