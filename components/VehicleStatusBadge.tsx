"use client"
import type { VehicleStatus } from "@/types"

interface VehicleStatusBadgeProps {
  status: VehicleStatus
}

const statusConfig: Record<VehicleStatus, { label: string; bgColor: string; textColor: string }> = {
  available: { label: "Available", bgColor: "bg-green-500", textColor: "text-white" },
  sold: { label: "Sold", bgColor: "bg-red-600", textColor: "text-white" },
  "newly-posted": { label: "New Listing", bgColor: "bg-blue-500", textColor: "text-white" },
  "limited-edition": { label: "Limited Edition", bgColor: "bg-amber-500", textColor: "text-white" },
}

export default function VehicleStatusBadge({ status }: VehicleStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig["available"]

  return (
    <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none">
      <div
        className={`
          absolute top-4 -right-8 
          ${config.bgColor} ${config.textColor}
          px-10 py-1.5
          transform rotate-45
          text-xs font-bold uppercase tracking-wider
          shadow-lg
          text-center
          w-40
        `}
      >
        {config.label}
      </div>
    </div>
  )
}
