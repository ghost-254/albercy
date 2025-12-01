"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit, Car, Loader2, LogOut, LayoutDashboard, Package, AlertCircle } from "lucide-react"
import ProtectedRoute from "@/components/admin/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"
import type { Vehicle, VehicleStatus } from "@/types"
import { addVehicle, getAllVehicles, updateVehicle, updateVehicleStatus, deleteVehicle } from "@/lib/vehicles"
import ImageUploader from "@/components/ImageUploader"
import { uploadImage } from "@/lib/storage"

const statusColors: Record<VehicleStatus, string> = {
  available: "bg-green-500",
  sold: "bg-red-500",
  "newly-posted": "bg-blue-500",
  "limited-edition": "bg-amber-500",
}

const statusLabels: Record<VehicleStatus, string> = {
  available: "Available",
  sold: "Sold",
  "newly-posted": "Newly Posted",
  "limited-edition": "Limited Edition",
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { adminData, logout } = useAuth()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null)

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    condition: "" as "New" | "Used" | "",
    fuelType: "",
    description: "",
    imageUrl: "",
    imageUrls: [] as (File | string)[],
    status: "newly-posted" as VehicleStatus,
  })

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const data = await getAllVehicles()
      setVehicles(data)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
      toast.error("Failed to fetch vehicles")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      make: "",
      model: "",
      year: "",
      price: "",
      condition: "",
      fuelType: "",
      description: "",
      imageUrl: "",
      imageUrls: [],
      status: "newly-posted",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.condition) {
      toast.error("Please select a condition")
      return
    }

    if (formData.imageUrls.length === 0) {
      toast.error("Please add at least one image")
      return
    }

    setSubmitting(true)

    try {
      console.log("[v0] Starting vehicle submission")

      const uploadedImageUrls: string[] = []

      for (let i = 0; i < formData.imageUrls.length; i++) {
        const img = formData.imageUrls[i]
        try {
          let imageUrl: string

          if (img instanceof File) {
            console.log("[v0] Uploading file:", img.name)
            const timestamp = Date.now()
            const path = `vehicles/${formData.make}-${formData.model}-${timestamp}-${i}`
            imageUrl = await uploadImage(img, path)
          } else {
            imageUrl = img
          }

          uploadedImageUrls.push(imageUrl)
        } catch (error) {
          console.error("[v0] Error uploading image at index", i, error)
          toast.error(`Failed to upload image ${i + 1}`)
          setSubmitting(false)
          return
        }
      }

      console.log("[v0] All images uploaded:", uploadedImageUrls)

      await addVehicle({
        make: formData.make,
        model: formData.model,
        year: Number.parseInt(formData.year),
        price: Number.parseInt(formData.price),
        condition: formData.condition as "New" | "Used",
        fuelType: formData.fuelType,
        description: formData.description,
        imageUrl: uploadedImageUrls[0], // First image as primary
        imageUrls: uploadedImageUrls,
        status: formData.status,
      })

      toast.success("Vehicle posted successfully!")
      resetForm()
      fetchVehicles()
    } catch (error) {
      console.error("[v0] Error adding vehicle:", error)
      toast.error("Failed to post vehicle")
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusChange = async (vehicle: Vehicle, newStatus: VehicleStatus) => {
    try {
      await updateVehicleStatus(vehicle.id, newStatus)
      toast.success(`Vehicle marked as ${statusLabels[newStatus]}`)
      fetchVehicles()
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status")
    }
  }

  const handleDelete = async () => {
    if (!vehicleToDelete) return

    try {
      await deleteVehicle(vehicleToDelete.id)
      toast.success("Vehicle deleted successfully")
      setDeleteDialogOpen(false)
      setVehicleToDelete(null)
      fetchVehicles()
    } catch (error) {
      console.error("Error deleting vehicle:", error)
      toast.error("Failed to delete vehicle")
    }
  }

  const openEditDialog = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle)
    setEditDialogOpen(true)
  }

  const handleEditSubmit = async (updatedData: Partial<Vehicle>) => {
    if (!vehicleToEdit) return

    try {
      await updateVehicle(vehicleToEdit.id, updatedData)
      toast.success("Vehicle updated successfully")
      setEditDialogOpen(false)
      setVehicleToEdit(null)
      fetchVehicles()
    } catch (error) {
      console.error("Error updating vehicle:", error)
      toast.error("Failed to update vehicle")
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === "available").length,
    sold: vehicles.filter((v) => v.status === "sold").length,
    newlyPosted: vehicles.filter((v) => v.status === "newly-posted").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#5900ff]/10 p-2 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-[#5900ff]" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-['Orbitron'] text-[#5900ff]">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {adminData?.username}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Vehicles</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Car className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Sold</p>
                  <p className="text-2xl font-bold text-red-600">{stats.sold}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <Car className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Newly Posted</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.newlyPosted}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="vehicles" className="gap-2">
              <Car className="h-4 w-4" />
              Manage Vehicles
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Vehicle
            </TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Inventory</CardTitle>
                <CardDescription>Manage your vehicle listings</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#5900ff]" />
                  </div>
                ) : vehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No vehicles posted yet</p>
                    <p className="text-sm text-gray-400">Add your first vehicle listing</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vehicle</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Condition</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {vehicles.map((vehicle) => (
                            <motion.tr
                              key={vehicle.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="border-b"
                            >
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <img
                                    src={vehicle.imageUrl || "/placeholder.svg"}
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    className="h-12 w-16 object-cover rounded"
                                  />
                                  <div>
                                    <p className="font-medium">
                                      {vehicle.make} {vehicle.model}
                                    </p>
                                    <p className="text-sm text-gray-500">{vehicle.fuelType}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{vehicle.year}</TableCell>
                              <TableCell>Ksh {vehicle.price.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge variant={vehicle.condition === "New" ? "default" : "secondary"}>
                                  {vehicle.condition}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={vehicle.status}
                                  onValueChange={(value) => handleStatusChange(vehicle, value as VehicleStatus)}
                                >
                                  <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="available">
                                      <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        Available
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="sold">
                                      <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        Sold
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="newly-posted">
                                      <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                        Newly Posted
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="limited-edition">
                                      <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                                        Limited Edition
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" onClick={() => openEditDialog(vehicle)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      setVehicleToDelete(vehicle)
                                      setDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Vehicle Tab */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Post New Vehicle</CardTitle>
                <CardDescription>Add a new vehicle to your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="make">Make</Label>
                      <Input
                        type="text"
                        id="make"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        placeholder="e.g., Toyota"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="e.g., Corolla"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="e.g., 2023"
                        min="1990"
                        max={new Date().getFullYear() + 1}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price (Ksh)</Label>
                      <Input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g., 2500000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={formData.condition} onValueChange={handleSelectChange("condition")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select value={formData.fuelType} onValueChange={handleSelectChange("fuelType")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Petrol">Petrol</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={handleSelectChange("status")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newly-posted">Newly Posted</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="limited-edition">Limited Edition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Enter vehicle details..."
                      required
                    />
                  </div>

                  <ImageUploader
                    images={formData.imageUrls}
                    onImagesChange={(images) => setFormData((prev) => ({ ...prev, imageUrls: images }))}
                    maxImages={5}
                  />

                  <Button type="submit" className="w-full bg-[#5900ff] hover:bg-[#4700cc]" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting Vehicle...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Post Vehicle
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {vehicleToDelete?.make} {vehicleToDelete?.model}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Vehicle Dialog */}
      <EditVehicleDialog
        vehicle={vehicleToEdit}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditSubmit}
      />
    </div>
  )
}

function EditVehicleDialog({
  vehicle,
  open,
  onOpenChange,
  onSubmit,
}: {
  vehicle: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<Vehicle>) => void
}) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    condition: "" as "New" | "Used" | "",
    fuelType: "",
    description: "",
    imageUrl: "",
  })

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year.toString(),
        price: vehicle.price.toString(),
        condition: vehicle.condition,
        fuelType: vehicle.fuelType,
        description: vehicle.description,
        imageUrl: vehicle.imageUrl,
      })
    }
  }, [vehicle])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      make: formData.make,
      model: formData.model,
      year: Number.parseInt(formData.year),
      price: Number.parseInt(formData.price),
      condition: formData.condition as "New" | "Used",
      fuelType: formData.fuelType,
      description: formData.description,
      imageUrl: formData.imageUrl,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogDescription>Update the vehicle details below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-make">Make</Label>
              <Input id="edit-make" name="make" value={formData.make} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="edit-model">Model</Label>
              <Input id="edit-model" name="model" value={formData.model} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-year">Year</Label>
              <Input type="number" id="edit-year" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="edit-price">Price (Ksh)</Label>
              <Input
                type="number"
                id="edit-price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Condition</Label>
              <Select value={formData.condition} onValueChange={handleSelectChange("condition")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fuel Type</Label>
              <Select value={formData.fuelType} onValueChange={handleSelectChange("fuelType")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-imageUrl">Image URL</Label>
            <Input
              type="url"
              id="edit-imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#5900ff] hover:bg-[#4700cc]">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
