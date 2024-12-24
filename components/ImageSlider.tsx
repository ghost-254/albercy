import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageSliderProps {
  images: string[]
  serviceName: string
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, serviceName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative h-48 w-full overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`${serviceName} - Image ${index + 1}`}
          layout="fill"
          objectFit="cover"
          className={`absolute top-0 left-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
  )
}

export default ImageSlider

