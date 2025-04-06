import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Popup } from '../../../payload-types' // You'll need to update this import path

export const revalidatePopup: CollectionAfterChangeHook<Popup> = ({ doc, req: { payload } }) => {
  payload.logger.info(`Popup updated: ${doc.title}`)
  return doc
}

export const revalidatePopupDelete: CollectionAfterDeleteHook<Popup> = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Popup deleted: ${doc?.title}`)
  return doc
}
