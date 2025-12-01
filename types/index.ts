export type VehicleStatus = "available" | "sold" | "newly-posted" | "limited-edition"

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  condition: "New" | "Used"
  fuelType: string
  description: string
  imageUrl: string 
  imageUrls: string[]
  status: VehicleStatus
  createdAt: Date
  updatedAt: Date
}

export interface AdminUser {
  uid: string
  email: string
  username: string
  role: "admin"
  createdAt: Date
}
