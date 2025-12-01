"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Car, DollarSign, Calendar, Fuel, Filter, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import VehicleStatusBadge from "@/components/VehicleStatusBadge"
import VehicleImageCarousel from "@/components/VehicleImageCarousel"
import type { Vehicle } from "@/types"
import { getAllVehicles } from "@/lib/vehicles"

export default function CarSalesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    condition: "All",
    priceRange: [0, 100000000],
    year: [1990, new Date().getFullYear()],
    make: [] as string[],
    fuelType: [] as string[],
    status: "All",
  })

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAllVehicles()
        setVehicles(data)
        setFilteredVehicles(data)
      } catch (err) {
        console.error("Error fetching vehicles:", err)
        setError("Failed to load vehicles. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  useEffect(() => {
    const filtered = vehicles.filter(
      (vehicle) =>
        (vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.condition === "All" || vehicle.condition === filters.condition) &&
        vehicle.price >= filters.priceRange[0] &&
        vehicle.price <= filters.priceRange[1] &&
        vehicle.year >= filters.year[0] &&
        vehicle.year <= filters.year[1] &&
        (filters.make.length === 0 || filters.make.includes(vehicle.make)) &&
        (filters.fuelType.length === 0 || filters.fuelType.includes(vehicle.fuelType)) &&
        (filters.status === "All" || vehicle.status === filters.status),
    )
    setFilteredVehicles(filtered)
  }, [searchTerm, filters, vehicles])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Get unique makes from available vehicles
  const uniqueMakes = [...new Set(vehicles.map((v) => v.make))]
  const uniqueFuelTypes = [...new Set(vehicles.map((v) => v.fuelType))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#5900ff] mx-auto mb-4" />
          <p className="text-gray-600">Loading vehicles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-[#5900ff] hover:bg-[#4700cc]">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 font-['Orbitron'] text-[#5900ff]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Car Sales
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="flex-grow">
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Search by make or model"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-white border-[#5900ff] text-gray-800 placeholder-gray-500"
              />
              <Button onClick={() => setIsFilterOpen(!isFilterOpen)} className="md:hidden bg-[#5900ff] text-white">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>

            {/* No vehicles message */}
            {vehicles.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <Car className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">No Vehicles Available</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  We currently don&apos;t have any vehicles listed for sale. Please check back later for new arrivals.
                </p>
              </motion.div>
            ) : filteredVehicles.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">No Matching Vehicles</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  No vehicles match your current filters. Try adjusting your search criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setFilters({
                      condition: "All",
                      priceRange: [0, 100000000],
                      year: [1990, new Date().getFullYear()],
                      make: [],
                      fuelType: [],
                      status: "All",
                    })
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-full flex flex-col bg-white border-[#5900ff] relative overflow-hidden">
                      {/* Diagonal Status Badge */}
                      <VehicleStatusBadge status={vehicle.status} />

                      <CardHeader>
                        <CardTitle className="font-['Orbitron'] text-[#5900ff]">
                          {vehicle.make} {vehicle.model}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <div className="relative mb-4">
                          <VehicleImageCarousel
                            images={
                              vehicle.imageUrls && vehicle.imageUrls.length > 0 ? vehicle.imageUrls : [vehicle.imageUrl]
                            }
                            vehicleTitle={`${vehicle.make} ${vehicle.model}`}
                            isSold={vehicle.status === "sold"}
                          />
                          {vehicle.status === "sold" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-bold transform -rotate-12">
                                SOLD
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="flex items-center mb-2">
                            <Calendar className="mr-2 h-4 w-4" /> Year: {vehicle.year}
                          </p>
                          <p className="flex items-center mb-2">
                            <DollarSign className="mr-2 h-4 w-4" /> Price: Ksh {vehicle.price.toLocaleString()}
                          </p>
                          <p className="flex items-center mb-2">
                            <Car className="mr-2 h-4 w-4" /> Condition: {vehicle.condition}
                          </p>
                          <p className="flex items-center mb-4">
                            <Fuel className="mr-2 h-4 w-4" /> Fuel Type: {vehicle.fuelType}
                          </p>
                        </div>
                        <Button
                          className={`w-full mt-auto ${vehicle.status === "sold" ? "bg-gray-400 cursor-not-allowed" : "bg-[#5900ff]"} text-white`}
                          disabled={vehicle.status === "sold"}
                        >
                          {vehicle.status === "sold" ? "Sold Out" : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Filter sidebar */}
          <motion.div
            className={`w-full md:w-64 bg-white p-4 rounded-lg shadow-lg ${isFilterOpen ? "block" : "hidden md:block"}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-[#5900ff]">Filters</h2>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Status</h3>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="newly-posted">Newly Posted</SelectItem>
                  <SelectItem value="limited-edition">Limited Edition</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Condition</h3>
              <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Price Range (Ksh)</h3>
              <div className="flex justify-between mb-2 text-sm">
                <span>{filters.priceRange[0].toLocaleString()}</span>
                <span>{filters.priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                min={0}
                max={10000000}
                step={100000}
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
              />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Year</h3>
              <div className="flex justify-between mb-2 text-sm">
                <span>{filters.year[0]}</span>
                <span>{filters.year[1]}</span>
              </div>
              <Slider
                min={1990}
                max={new Date().getFullYear()}
                value={filters.year}
                onValueChange={(value) => handleFilterChange("year", value)}
              />
            </div>

            {uniqueMakes.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Make</h3>
                {uniqueMakes.map((make) => (
                  <div key={make} className="flex items-center mb-2">
                    <Checkbox
                      id={`make-${make}`}
                      checked={filters.make.includes(make)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleFilterChange("make", [...filters.make, make])
                        } else {
                          handleFilterChange(
                            "make",
                            filters.make.filter((m) => m !== make),
                          )
                        }
                      }}
                    />
                    <label htmlFor={`make-${make}`} className="ml-2 text-sm">
                      {make}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {uniqueFuelTypes.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Fuel Type</h3>
                {uniqueFuelTypes.map((fuelType) => (
                  <div key={fuelType} className="flex items-center mb-2">
                    <Checkbox
                      id={`fuel-${fuelType}`}
                      checked={filters.fuelType.includes(fuelType)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleFilterChange("fuelType", [...filters.fuelType, fuelType])
                        } else {
                          handleFilterChange(
                            "fuelType",
                            filters.fuelType.filter((f) => f !== fuelType),
                          )
                        }
                      }}
                    />
                    <label htmlFor={`fuel-${fuelType}`} className="ml-2 text-sm">
                      {fuelType}
                    </label>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() =>
                setFilters({
                  condition: "All",
                  priceRange: [0, 10000000],
                  year: [1990, new Date().getFullYear()],
                  make: [],
                  fuelType: [],
                  status: "All",
                })
              }
              className="w-full bg-[#5900ff] text-white"
            >
              Reset Filters
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
