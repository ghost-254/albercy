'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, AlertTriangle, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false })

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  mapLink: string;
  issue: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function EmergencyServices() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    mapLink: '',
    issue: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [mapUrl, setMapUrl] = useState('')
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    //This effect is no longer needed since map is handled by LeafletMap component
    return () => {}
  }, [])

  const handleMapClick = (lat: number, lng: number) => {
    updateMapLink(lat, lng)
  }

  const updateMapLink = (lat: number, lng: number) => {
    const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
    setFormData(prev => ({ ...prev, mapLink }));
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    else if (!/^\+?[0-9]{10,14}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.mapLink.trim()) newErrors.mapLink = 'Map Link is required'
    if (!formData.issue.trim()) newErrors.issue = 'Issue description is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const sendEmail = async () => {
    if (!isConfirmed) {
      toast.error('Please confirm your details before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      const currentDate = new Date().toISOString();
      await emailjs.send(
        'service_2vnaucn',
        'template_7queqj5',
        {
          ...formData,
          submission_date: currentDate,
        },
        'HT7Nc1eI3wcfynlvH'
      )

      toast.success('Emergency service requested. We will contact you shortly.')
      setFormData({ name: '', email: '', phone: '', location: '', mapLink: '', issue: '' })
      setShowConfirmation(false)
      setIsConfirmed(false)
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Failed to send request. Please try again or call our emergency number.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white text-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 font-['Orbitron'] text-red-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Emergency Services
        </motion.h1>

        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 font-['Orbitron'] text-red-600">Request Emergency Assistance</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="location">What's Your Location?</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <Label htmlFor="mapLink">Location on Map (Click on the map to set)</Label>
              <Input
                type="text"
                id="mapLink"
                name="mapLink"
                value={formData.mapLink}
                onChange={handleChange}
                className={errors.mapLink ? 'border-red-500' : ''}
                readOnly
              />
              {errors.mapLink && <p className="text-red-500 text-xs mt-1">{errors.mapLink}</p>}
            </div>
            <LeafletMap onMapClick={handleMapClick} />
            <div>
              <Label htmlFor="issue">Describe the Issue</Label>
              <Textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows={4}
                className={errors.issue ? 'border-red-500' : ''}
              />
              {errors.issue && <p className="text-red-500 text-xs mt-1">{errors.issue}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? 'Sending...' : 'Request Emergency Service'}
            </Button>
          </form>
        </motion.div>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Emergency Service Request</DialogTitle>
              <DialogDescription>
                Please review and confirm your information:
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Location on Map:</strong> <a href={formData.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View on OpenStreetMap</a></p>
              <p><strong>Issue:</strong> {formData.issue}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm"
                checked={isConfirmed}
                onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
              />
              <label
                htmlFor="confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that the information provided is correct
              </label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
              <Button onClick={sendEmail} disabled={!isConfirmed || isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Confirm and Send'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-red-600 flex items-center">
              <Phone className="mr-2" /> Emergency Contact
            </h2>
            <p className="text-lg">+254 (020) 800-0664</p>
            <p className="text-sm text-gray-600 mt-2">Available 24/7 for emergency services</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-red-600 flex items-center">
              <MapPin className="mr-2" /> Service Area
            </h2>
            <p className="text-lg">Nairobi and surrounding areas</p>
            <p className="text-sm text-gray-600 mt-2">We provide mobile emergency services</p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-red-600 flex items-center">
            <Clock className="mr-2" /> Response Time
          </h2>
          <p className="text-lg">We aim to reach you within 30-60 minutes of your request</p>
          <p className="text-sm text-gray-600 mt-2">Response time may vary based on location and traffic conditions</p>
        </motion.div>

        <motion.div 
          className="mt-8 bg-red-100 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-red-600 flex items-center">
            <AlertTriangle className="mr-2" /> Important Note
          </h2>
          <p className="text-lg">If you are in immediate danger, please call emergency services at 999 or 112.</p>
          <p className="text-sm text-gray-600 mt-2">Our emergency services are for vehicle-related issues only.</p>
        </motion.div>
      </div>
    </div>
  )
}

