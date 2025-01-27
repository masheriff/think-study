import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import type { BookAppointmentBlock as BookAppointmentBlockType, Media } from '@/payload-types'

const isMedia = (value: any): value is Media => {
  return typeof value === 'object' && value !== null && 'url' in value
}

type Props = {
  className?: string
} & BookAppointmentBlockType

export const BookAppointmentBlock: React.FC<Props> = (props) => {
  const { className, mainContent, schedule, info } = props

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="space-y-6">
            {mainContent?.text && <RichText data={mainContent.text} />}
            {mainContent?.btn && (
              <Link
                href={mainContent.btn.url}
                className="inline-block bg-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors"
              >
                {mainContent.btn.text}
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="space-y-8">
            {/* Schedule Card */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Available Times</h3>
              <div className="space-y-4">
                {schedule?.map((item, index) => (
                  <div key={index} className="border-b pb-4">
                    <h4 className="font-medium capitalize mb-2">{item.day}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.slots?.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="text-sm bg-white px-3 py-2 rounded border hover:border-violet-500 cursor-pointer"
                        >
                          {slot.start} - {slot.end}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              {info?.text && <RichText data={info.text} />}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {info?.media?.map((item, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    {item.img && isMedia(item.img) && (
                      <Image
                        src={item.img.url || ''}
                        alt={item.alt || ''}
                        fill
                        className="object-cover"
                      />
                    )}
                    {item.alt && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                        {item.alt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
