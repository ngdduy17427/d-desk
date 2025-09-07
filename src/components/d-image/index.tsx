import Image from 'next/image'
import { memo } from 'react'
import { WCDImage } from 'web-components'
import './css.css'

type DImageProps = {
  id?: string
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  unoptimized?: boolean
  onLoad?: () => void
  onClick?: () => void
}

const DImageComp = ({
  id,
  src,
  alt,
  className,
  loading,
  unoptimized,
  onLoad,
  onClick,
}: DImageProps) => {
  return (
    <WCDImage
      id={id}
      className={className}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes='(max-width: 768px) 100vw, 33vw'
        quality={100}
        loading={loading}
        unoptimized={unoptimized}
        onLoad={onLoad}
      />
    </WCDImage>
  )
}

export const DImage = memo(DImageComp)
