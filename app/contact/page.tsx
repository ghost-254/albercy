'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { MdDirectionsCar, MdBuild } from 'react-icons/md'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface FormData {
  name: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceType: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceType: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Vehicle make is required'
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required'
    if (!formData.vehicleYear.trim()) newErrors.vehicleYear = 'Vehicle year is required'
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const sendEmail = async () => {
    setIsSubmitting(true)
    try {
      // Send email to Albercy Auto Clinic
      await emailjs.send(
        'service_0yqhktj',
        'template_avxi814',
        {
          ...formData,
          submission_date: new Date().toLocaleString(),
        },
        'tu6heFgClZ_X5uU3Z'
      )

      toast.success('Your request has been submitted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setShowSummary(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        serviceType: '',
        message: '',
      })
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('An error occurred. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } finally {
      setIsSubmitting(false)
      setShowConfirmation(false)
    }
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
          Contact Albercy Auto Clinic
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center font-['Orbitron'] text-[#5900ff]">
                  <FaPhone className="mr-2" /> Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 flex items-center">
                  <FaPhone className="mr-2 text-[#5900ff]" /> +254 (020) 800-0664
                </p>
                <p className="mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-[#5900ff]" /> info@albercy.com
                </p>
                <p className="flex items-start">
                  <FaMapMarkerAlt className="mr-2 mt-1 text-[#5900ff]" /> Kenyatta Av, Dar es Salaam Rd, Shell Petrol Stn, GPO Nairobi, Kenya
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center font-['Orbitron'] text-[#5900ff]">
                  <FaEnvelope className="mr-2" /> Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="mb-2">Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="font-['Orbitron'] text-[#5900ff]">Request Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium mb-1">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff] ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="vehicleMake" className="block text-sm font-medium mb-1">Vehicle Make</Label>
                    <Input
                      type="text"
                      id="vehicleMake"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff] ${errors.vehicleMake ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.vehicleMake && <p className="text-red-500 text-xs mt-1">{errors.vehicleMake}</p>}
                  </div>
                  <div>
                    <Label htmlFor="vehicleModel" className="block text-sm font-medium mb-1">Vehicle Model</Label>
                    <Input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff] ${errors.vehicleModel ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.vehicleModel && <p className="text-red-500 text-xs mt-1">{errors.vehicleModel}</p>}
                  </div>
                  <div>
                    <Label htmlFor="vehicleYear" className="block text-sm font-medium mb-1">Vehicle Year</Label>
                    <Input
                      type="number"
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff] ${errors.vehicleYear ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.vehicleYear && <p className="text-red-500 text-xs mt-1">{errors.vehicleYear}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="serviceType" className="block text-sm font-medium mb-1">Service Type</Label>
                  <Select
                    name="serviceType"
                    value={formData.serviceType}
                    onValueChange={(value) => handleChange({ target: { name: 'serviceType', value } })}
                  >
                    <SelectTrigger className={`w-full ${errors.serviceType ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="generator-repair">Generator Repair</SelectItem>
                      <SelectItem value="telematics">Telematics</SelectItem>
                      <SelectItem value="diagnostics">Diagnostics</SelectItem>
                      <SelectItem value="wheel-alignment">Wheel Alignment</SelectItem>
                      <SelectItem value="balancing">Balancing</SelectItem>
                      <SelectItem value="car-service">Car Service</SelectItem>
                      <SelectItem value="engine-overhaul">Engine Overhaul</SelectItem>
                      <SelectItem value="welding">Welding</SelectItem>
                      <SelectItem value="car-sales">Car Sales</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-1">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-[#5900ff] focus:border-[#5900ff] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5900ff] hover:bg-[#4600c7] text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Submission</DialogTitle>
              <DialogDescription>
                Please review your information before submitting:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Vehicle:</strong> {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</p>
              <p><strong>Service Type:</strong> {formData.serviceType}</p>
              <p><strong>Message:</strong> {formData.message}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
              <Button onClick={sendEmail} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Confirm and Send'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-[#5900ff] to-[#4600c7] text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center font-['Orbitron']">
                  <MdDirectionsCar className="mr-2 text-2xl" /> Expert Diagnostics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our state-of-the-art diagnostic equipment ensures accurate problem identification for all vehicle makes and models.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Card className="bg-gradient-to-br from-[#5900ff] to-[#4600c7] text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center font-['Orbitron']">
                  <MdBuild className="mr-2 text-2xl" /> Quality Repairs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our skilled technicians use only high-quality parts and advanced techniques to ensure your vehicle performs at its best.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Card className="bg-gradient-to-br from-[#5900ff] to-[#4600c7] text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center font-['Orbitron']">
                  <FaEnvelope className="mr-2 text-2xl" /> Comprehensive Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>From routine maintenance to complex repairs, we offer a wide range of services to keep your vehicle running smoothly.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

