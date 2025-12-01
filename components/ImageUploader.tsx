"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ImageUploaderProps {
  onImagesChange: (images: (File | string)[]) => void
  images: (File | string)[]
  maxImages?: number
}

export default function ImageUploader({ onImagesChange, images, maxImages = 5 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Generate previews for files
  React.useEffect(() => {
    const newPreviews: string[] = []

    images.forEach((img) => {
      if (img instanceof File) {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result as string)
          if (newPreviews.length === images.length) {
            setPreviewUrls(newPreviews)
          }
        }
        reader.readAsDataURL(img)
      } else {
        newPreviews.push(img)
        if (newPreviews.length === images.length) {
          setPreviewUrls(newPreviews)
        }
      }
    })

    if (images.length === 0) {
      setPreviewUrls([])
    }
  }, [images])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const totalImages = images.length + files.length

    if (totalImages > maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    onImagesChange([...images, ...files])
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const handleUrlAdd = (url: string) => {
    if (!url.trim()) return
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }
    onImagesChange([...images, url])
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Upload Images</Label>
        <div className="mt-2 flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={images.length >= maxImages}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={images.length >= maxImages}
        />
      </div>

      {/* Or add by URL */}
      <div>
        <Label htmlFor="image-url">Or Add by URL</Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="image-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            disabled={images.length >= maxImages}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleUrlAdd((e.target as HTMLInputElement).value)
                ;(e.target as HTMLInputElement).value = ""
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              const input = document.getElementById("image-url") as HTMLInputElement
              handleUrlAdd(input.value)
              input.value = ""
            }}
            disabled={images.length >= maxImages}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Image Preview Gallery */}
      {previewUrls.length > 0 && (
        <div>
          <Label>
            Image Preview ({images.length}/{maxImages})
          </Label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {previewUrls.map((preview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No images added yet</p>
        </div>
      )}
    </div>
  )
}
