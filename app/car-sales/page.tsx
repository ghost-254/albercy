//app/car-sales/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Car, DollarSign, Calendar, Fuel, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'

interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  condition: 'New' | 'Used'
  fuelType: string
  imageUrl: string
}

export default function CarSalesPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    condition: 'All',
    priceRange: [0, 100000000],
    year: [1990, new Date().getFullYear()],
    make: [] as string[],
    model: [] as string[],
    fuelType: [] as string[],
  })

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchCars = async () => {
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const mockCars: Car[] = [
          { id: '1', make: 'Toyota', model: 'Corolla', year: 2022, price: 2000000, condition: 'New', fuelType: 'Petrol', imageUrl: '/toyota-corolla.webp' },
          { id: '2', make: 'Honda', model: 'Civic', year: 2021, price: 1800000, condition: 'Used', fuelType: 'Hybrid', imageUrl: '/hondo-civic.jpg' },
          { id: '3', make: 'Ford', model: 'Mustang', year: 2023, price: 3500000, condition: 'New', fuelType: 'Petrol', imageUrl: '/mustang.webp' },
          { id: '4', make: 'Tesla', model: 'Model 3', year: 2022, price: 4500000, condition: 'Used', fuelType: 'Electric', imageUrl: '/tesla.webp' },
          { id: '5', make: 'BMW', model: 'X5', year: 2023, price: 6000000, condition: 'New', fuelType: 'Diesel', imageUrl: '/bmw.webp' },
        ]
        setCars(mockCars)
        setFilteredCars(mockCars)
      }, 1000)
    }

    fetchCars()
  }, [])

  useEffect(() => {
    const filtered = cars.filter(car => 
      (car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
       car.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.condition === 'All' || car.condition === filters.condition) &&
      (car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]) &&
      (car.year >= filters.year[0] && car.year <= filters.year[1]) &&
      (filters.make.length === 0 || filters.make.includes(car.make)) &&
      (filters.model.length === 0 || filters.model.includes(car.model)) &&
      (filters.fuelType.length === 0 || filters.fuelType.includes(car.fuelType))
    )
    setFilteredCars(filtered)
  }, [searchTerm, filters, cars])

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
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
              <Button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden bg-[#5900ff] text-white"
              >
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col bg-white border-[#5900ff]">
                    <CardHeader>
                      <CardTitle className="font-['Orbitron'] text-[#5900ff]">{car.make} {car.model}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover mb-4 rounded-md" />
                      <div className="flex-grow">
                        <p className="flex items-center mb-2"><Calendar className="mr-2 h-4 w-4" /> Year: {car.year}</p>
                        <p className="flex items-center mb-2"><DollarSign className="mr-2 h-4 w-4" /> Price: Ksh {car.price.toLocaleString()}</p>
                        <p className="flex items-center mb-2"><Car className="mr-2 h-4 w-4" /> Condition: {car.condition}</p>
                        <p className="flex items-center mb-4"><Fuel className="mr-2 h-4 w-4" /> Fuel Type: {car.fuelType}</p>
                      </div>
                      <Button className="w-full mt-auto bg-[#5900ff] text-white">View Details</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Filter sidebar */}
          <motion.div 
            className={`w-full md:w-64 bg-white p-4 rounded-lg shadow-lg ${isFilterOpen ? 'block' : 'hidden md:block'}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-[#5900ff]">Filters</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Condition</h3>
              <Select 
                value={filters.condition} 
                onValueChange={(value) => handleFilterChange('condition', value)}
              >
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
              <div className="flex justify-between mb-2">
                <span>{filters.priceRange[0].toLocaleString()}</span>
                <span>{filters.priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                min={0}
                max={10000000}
                step={100000}
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
              />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Year</h3>
              <div className="flex justify-between mb-2">
                <span>{filters.year[0]}</span>
                <span>{filters.year[1]}</span>
              </div>
              <Slider
                min={1990}
                max={new Date().getFullYear()}
                value={filters.year}
                onValueChange={(value) => handleFilterChange('year', value)}
              />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Make</h3>
              {['Toyota', 'Honda', 'Ford', 'Tesla', 'BMW'].map((make) => (
                <div key={make} className="flex items-center mb-2">
                  <Checkbox
                    id={`make-${make}`}
                    checked={filters.make.includes(make)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleFilterChange('make', [...filters.make, make])
                      } else {
                        handleFilterChange('make', filters.make.filter(m => m !== make))
                      }
                    }}
                  />
                  <label htmlFor={`make-${make}`} className="ml-2">{make}</label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Fuel Type</h3>
              {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((fuelType) => (
                <div key={fuelType} className="flex items-center mb-2">
                  <Checkbox
                    id={`fuel-${fuelType}`}
                    checked={filters.fuelType.includes(fuelType)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleFilterChange('fuelType', [...filters.fuelType, fuelType])
                      } else {
                        handleFilterChange('fuelType', filters.fuelType.filter(f => f !== fuelType))
                      }
                    }}
                  />
                  <label htmlFor={`fuel-${fuelType}`} className="ml-2">{fuelType}</label>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => setFilters({
                condition: 'All',
                priceRange: [0, 10000000],
                year: [1990, new Date().getFullYear()],
                make: [],
                model: [],
                fuelType: [],
              })}
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

