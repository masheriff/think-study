import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { CallToActionBlock } from './CallToAction/Component'
import { FormBlock } from './Form/Component'
import { MediaBlock } from './MediaBlock/Component'

type BlockComponentsType = {
  cta: typeof CallToActionBlock
  formBlock: typeof FormBlock
  mediaBlock: typeof MediaBlock
}

const blockComponents: BlockComponentsType = {
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
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
            <div className="my-16" key={index}>
              <Block {...(block as any)} disableInnerContainer />
            </div>
          )
        }
        return null
      })}
    </Fragment>
  )
}
