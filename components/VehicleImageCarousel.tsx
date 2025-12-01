"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VehicleImageCarouselProps {
  images: string[]
  vehicleTitle: string
  isSold?: boolean
}

export default function VehicleImageCarousel({ images, vehicleTitle, isSold = false }: VehicleImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div
        className={`w-full h-48 object-cover rounded-md flex items-center justify-center bg-gray-200 ${isSold ? "opacity-60" : ""}`}
      >
        <span className="text-gray-400">No image available</span>
      </div>
    )
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full">
      <div className={`relative w-full h-48 rounded-md overflow-hidden ${isSold ? "opacity-60" : ""}`}>
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${vehicleTitle} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder.svg"
          }}
        />
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 h-12 w-16 rounded border-2 transition-all ${
                  currentIndex === index ? "border-[#5900ff]" : "border-gray-300"
                }`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
