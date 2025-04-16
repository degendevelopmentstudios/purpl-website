import Image from "next/image"
import type { CSSProperties } from "react"

interface TransparentImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  style?: CSSProperties
}

export default function TransparentImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  style = {},
}: TransparentImageProps) {
  return (
    <div className="png-fix">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        style={{ objectFit: "contain", ...style }}
      />
    </div>
  )
}
