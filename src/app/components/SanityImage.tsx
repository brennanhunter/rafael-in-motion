import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface SanityImageProps {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  value: SanityImageSource & { alt?: string; asset?: { metadata?: { lqip?: string } } }
  alt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function SanityImage({ 
  value, 
  alt,
  width = 800, 
  height, 
  className, 
  priority 
}: SanityImageProps) {
  if (!value?.asset) return null

  const imageAlt = alt || value.alt || ''
  const imageHeight = height || Math.round(width / 1.5) // Default aspect ratio

  return (
    <Image
      className={className}
      src={urlFor(value)
        .width(width)
        .height(imageHeight)
        .url()}
      alt={imageAlt}
      width={width}
      height={imageHeight}
      priority={priority}
      placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={value.asset.metadata?.lqip}
    />
  )
}
