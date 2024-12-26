'use client'

import React from 'react'
import { motion } from "framer-motion"
import { Battery, Wifi, Cpu, Compass, CircleDot, Car, Cog, Flame, ShoppingCart, Phone, Mail, MapPin, Globe, Clock, Users, Paintbrush, Truck, Wind } from 'lucide-react'
import { ContactPopup } from '@/components/ContactPopup'
import { HeroSection } from '@/components/HeroSection'
import ImageSlider from '@/components/ImageSlider'
import '@/styles/fonts.css'

export default function AlbercyLandingPage() {
  const [isContactPopupOpen, setIsContactPopupOpen] = React.useState(false);

  const services = [
    {
      name: "Generator repair",
      description: "Expert repair and maintenance for all types of generators.",
      icon: Battery,
      images: [
        "/gen1.jpeg",
        "/gen2.jpg",
        "/gen3.jpg",
        "/gen4.jpg",
        "/gen5.jpg",
        "/gen6.jpg",
        "/gen7.jpg",
        "/gen8.jpg",
        "/gen9.jpeg"
      ]
    },
    {
      name: "Telematics",
      description: "Advanced vehicle tracking and fleet management solutions.",
      icon: Wifi,
      images: [
        "/tel1.png",
        "/tel2.jpg",
        "/tel3.jpg",
        "/tel4.jpeg",
        "/tel5.jpg",
        "/tel6.png",
        "/tel7.jpg",
        "/tel8.png"
      ]
    },
    {
      name: "Diagnostics",
      description: "Cutting-edge diagnostic tools to identify and solve vehicle issues.",
      icon: Cpu,
      images: [
        "/diag1.jpeg",
        "/diag2.jpeg",
        "/diag3.jpeg",
        "/diag3.jpg",
        "/diag5.jpeg",
        "/diag6.jpg",
        "/diag7.jpeg"
      ]
    },
    {
      name: "Wheel Alignment",
      description: "Precise wheel alignment services for optimal vehicle performance.",
      icon: Compass,
      images: [
        "/wheel1.jpg",
        "/wheel2.png",
        "/wheel3.jpeg",
        "/wheel4.jpg",
        "/wheel5.jpeg",
        "/wheel6.jpg",
        "/wheel7.jpg"
      ]
    },
    {
      name: "Tire Balancing",
      description: "Professional tire balancing for a smoother, safer ride.",
      icon: CircleDot,
      images: [
        "/tire1.jpg",
        "/tire2.jpg",
        "/tire3.jpg",
        "/tire4.webp",
        "/tire5.jpg",
        "/tire6.jpg"
      ]
    },
    {
      name: "Car Service",
      description: "Comprehensive car servicing to keep your vehicle in top condition.",
      icon: Car,
      images: [
        "/serv1.jpeg",
        "/serv2.jpg",
        "/serv3.webp",
        "/serv4.jpg",
        "/serv5.jpg",
        "/serv6.webp"
    
      ]
    },
    {
      name: "Engine Overhaul",
      description: "Complete gearbox and engine overhaul services for all makes and models.",
      icon: Cog,
      images: [
        "/eng1.jpg",
        "/eng2.jpg",
        "/eng3.jpg",
        "/eng4.jpg",
        "/eng5.webp",
        "/eng6.webp",
        "/eng7.webp",
        "/eng8.jpg",
        "/eng9.jpg"
      ]
    },
    {
      name: "Welding",
      description: "Custom welding and fabrication services for automotive needs.",
      icon: Flame,
      images: [
        "/weld1.webp",
        "/weld2.jpg",
        "/weld3.jpg",
        "/weld4.webp",
        "/weld5.webp",
        "/weld6.jpg"
      ]
    },
    {
      name: "Car Sales & Accessories",
      description: "Quality pre-owned vehicles and assistance in finding your perfect car.",
      icon: ShoppingCart,
      images: [
        "/car1.jpg",
        "/car2.jpg",
        "/car3.jpg",
        "/car4.jpg",
        "/car5.jpg",
        "/car6.jpg",
        "/car7.jpg",
        "/car8.jpg",
        "/car9.jpg",
        "/car10.jpg",
        "/car11.jpg",
        "/car12.jpg",
        "/car13.jpg"
      ]
    },
    {
      name: "Body Works & Spray Painting",
      description: "Expert body repair and professional spray painting services.",
      icon: Paintbrush,
      images: [
        "/bod1.jpg",
        "/bod2.jpg",
        "/bod3.jpg",
        "/bod4.webp"
      ]
    },
    {
      name: "Heavy Equipment Maintenance",
      description: "Specialized maintenance and repair for heavy machinery and equipment.",
      icon: Truck,
      images: [
        "/heavy1.jpeg",
        "/heavy2.webp",
        "/heavy3.webp",
        "/heavy4.jpg",
        "/heavy5.avif"
      ]
    },
    {
      name: "A/C Maintenance & Refilling",
      description: "Complete A/C system service, including maintenance and refrigerant refilling.",
      icon: Wind,
      images: [
        "/ac1.jpeg",
        "/ac2.png",
        "/ac3.jpg",
        "/ac4.jpeg",
        "/ac5.png"
      ]
    }
  ]

  const additionalCards = [
    {
      title: "24/7 Support",
      description: "Our team is always ready to assist you with any automotive needs.",
      icon: Clock
    },
    {
      title: "Expert Team",
      description: "Highly skilled professionals with years of industry experience.",
      icon: Users
    },
    {
      title: "Online Booking",
      description: "Schedule your service appointments online with ease.",
      icon: Globe
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800">
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <motion.section 
          id="services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center font-['Orbitron'] text-[#5900ff]">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 overflow-hidden"
              >
                <div className="p-4 bg-gradient-to-r from-[#5900ff] to-[#4600c7]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold font-['Orbitron'] text-white">{service.name}</h3>
                    <div className="bg-white p-2 rounded-full">
                      <service.icon className="h-6 w-6 text-[#5900ff]" />
                    </div>
                  </div>
                </div>
                <ImageSlider images={service.images} serviceName={service.name} />
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center font-['Orbitron'] text-[#5900ff]">Why Choose Albercy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalCards.map((card, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-gradient-to-br from-[#5900ff] to-[#4600c7] p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <card.icon className="h-6 w-6 text-[#5900ff]" />
                  </div>
                  <h3 className="text-xl font-semibold font-['Orbitron']">{card.title}</h3>
                </div>
                <p>{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center bg-gray-100 py-12 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold mb-8 font-['Orbitron'] text-[#5900ff]">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-[#5900ff] mr-2" />
              <span>+254 (020) 800-0664</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-[#5900ff] mr-2" />
              <span>info@albercy.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-[#5900ff] mr-2" />
              <span>Kenyatta Av, Dar es Salaam Rd, Shell Petrol Stn, GPO Nairobi, Kenya</span>
            </div>
          </div>
        </motion.section>
      </div>

      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
      />
    </div>
  )
}

