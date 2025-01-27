import Image from 'next/image'
import clsx from 'clsx'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export const Logo = (props: Props) => {
  const { priority, className } = props

  return (
    <Image
      alt="Think_Study Logo"
      width={193}
      height={34}
      priority={priority}
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src="/media/logo.png"
    />
  )
}
