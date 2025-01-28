import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import type { AppointmentBlock as AppointmentBlockType, Media } from '@/payload-types'

type Props = AppointmentBlockType & {
  className?: string
}

export const AppointmentBlock: React.FC<Props> = (props) => {
  const { className, leftContent, rightContent, bottomText } = props

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    return { day, month, year }
  }

  const { day, month, year } = formatDate(rightContent.schedule.date)

  return (
    <section className={cn('bg-cyan-100 rounded-2xl mx-24', className)}>
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="space-y-6">
            {leftContent?.richText && <RichText data={leftContent.richText} />}
            {leftContent?.paragraph1 && (
              <p className="flex items-center ml-8">
                <Image src="/media/icons/square.png" alt='checkbox' width={20} height={20} className='mr-2' />
                {leftContent.paragraph1}
              </p>
            )}
            {leftContent?.paragraph2 && (
              <p className="flex items-center ml-8">
                <Image src="/media/icons/square.png" alt='checkbox' width={20} height={20} className='mr-2' />
                {leftContent.paragraph2}
              </p>
            )}
            {leftContent?.paragraph3 && (
              <p className="flex items-center ml-8">
                <Image src="/media/icons/square.png" alt='checkbox' width={20} height={20} className='mr-2' />
                {leftContent.paragraph3}
              </p>
            )}
            {leftContent?.button && (
              <Link
                href={leftContent.button.url}
                className="inline-block bg-violet-600 text-white px-8 py-3 rounded-3xl ml-12 font-medium hover:bg-violet-700 transition-colors"
              >
                {leftContent.button.text}
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex flex-row items-center space-y-8 justify-evenly">
            {/* Schedule Card */}
            <div className="bg-lime-300 rounded-xl p-12 shadow-sm max-w-md text-center">
              <h1 className="text-4xl font-bold">{day}</h1>
              <h4 className="text-lg">{month}, {year}</h4>
              <p>{rightContent.schedule.day}</p>
              <p>{rightContent.schedule.time}</p>
            </div>

            {/* Info Card */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm max-w-md">
              <p>{rightContent.info.text}</p>
              <div className="flex flex-col">
                {rightContent.info.imgs?.map((item, index) => (
                  <div key={index} className="relative rounded-lg p-4 overflow-hidden">
                    {typeof item.img !== 'number' && item.img && (
                      <Image
                        src={item.img.url || ''}
                        alt={item.alt || ''}
                        width={150}
                        height={5}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Text Field */}
      <div className="flex justify-end p-4">
        <p>{bottomText}</p>
      </div>
    </section>
  )
}