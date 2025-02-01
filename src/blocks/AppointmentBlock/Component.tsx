import type React from "react"
import { cn } from "@/utilities/ui"
import Image from "next/image"
import Link from "next/link"
import RichText from "@/components/RichText"
import type { AppointmentBlock as AppointmentBlockType } from "@/payload-types"

type Props = AppointmentBlockType & {
  className?: string
}

export const AppointmentBlock: React.FC<Props> = (props) => {
  const { className, leftContent, rightContent, bottomText } = props

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.getFullYear()
    return { day, month, year }
  }

  const { day, month, year } = formatDate(rightContent.schedule.date)

  return (
    <section className={cn("my-8", className)}>
      <div className="container bg-cyan-100 p-6 mx-auto rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section */}
          <div className="space-y-8">
            {leftContent?.richText && <RichText data={leftContent.richText} className="text-xl font-bold" />}
            <div className="ml-4">
              {leftContent?.paragraph1 && (
                <p className="text-gray-700 text-lg flex items-center ml-8">
                  <Image src="/media/icons/square.png" alt="checkbox" width={20} height={20} className="mr-2" />
                  {leftContent.paragraph1}
                </p>
              )}
              {leftContent?.paragraph2 && (
                <p className="text-gray-700 text-lg flex items-center ml-8">
                  <Image src="/media/icons/square.png" alt="checkbox" width={20} height={20} className="mr-2" />
                  {leftContent.paragraph2}
                </p>
              )}
              {leftContent?.paragraph3 && (
                <p className="text-gray-700 text-lg flex items-center ml-8">
                  <Image src="/media/icons/square.png" alt="checkbox" width={20} height={20} className="mr-2" />
                  {leftContent.paragraph3}
                </p>
              )}
            </div>
            {leftContent?.button && (
              <Link
                href={leftContent.button.url}
                className="inline-block bg-purple-800 hover:bg-purple-900 text-white p-3 rounded-full text-base font-semibold mt-6 ml-8"
              >
                {leftContent.button.text}
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full py-20">
            {/* Schedule Card */}
            <div className="bg-lime-300 rounded-2xl p-6 shadow-lg flex flex-col justify-between aspect-square">
              <div className="text-center my-auto">
                <div className="text-9xl font-semibold mb-2">{day}</div>
                <div className="text-lg font-medium mb-2">
                  {month} {year}
                </div>
                <hr className="border-gray-800 mb-2" />
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="text-sm font-semibold">{rightContent.schedule.day}</span>
                <div className="text-right">
                  <p className="text-sm">{rightContent.schedule.timeSlot1}</p>
                  <p className="text-sm">{rightContent.schedule.timeSlot2}</p>
                </div>
              </div>
            </div>

            {/* Universities Card */}
            <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col aspect-square">
              <h3 className="text-lg text-center font-bold mb-2">Participating Universities</h3>
              <div className="flex flex-col justify-center items-center space-y-4 flex-grow">
                {rightContent.info.imgs?.map((item, index) => (
                  <div key={index} className="rounded-lg flex items-center justify-center w-fit">
                    {typeof item.img !== "number" && item.img && (
                      <Image
                        src={item.img.url || ""}
                        alt={item.alt || ""}
                        width={150}
                        height={50}
                        className="object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Text */}
        <div className="text-right text-sm text-gray-600">{bottomText}</div>
      </div>
    </section>
  )
}

