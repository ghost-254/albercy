'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Wrench, Battery, Wifi, Cpu, Compass, CircleDot, Car, Cog, Flame, ShoppingCart, Phone, Mail, MapPin, Globe, Clock, Users } from 'lucide-react'
import { NotificationBanner } from '../components/NotificationBanner';
import '@/styles/fonts.css';
import { Menu } from 'lucide-react';
import { ContactPopup } from '../components/ContactPopup'

export default function AlbercyLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const services = [
    {
      name: "Generator repair",
      description: "Expert repair and maintenance for all types of generators.",
      icon: Battery
    },
    {
      name: "Telematics",
      description: "Advanced vehicle tracking and fleet management solutions.",
      icon: Wifi
    },
    {
      name: "Diagnostics",
      description: "Cutting-edge diagnostic tools to identify and solve vehicle issues.",
      icon: Cpu
    },
    {
      name: "Wheel alignment",
      description: "Precise wheel alignment services for optimal vehicle performance.",
      icon: Compass
    },
    {
      name: "Balancing",
      description: "Professional tire balancing for a smoother, safer ride.",
      icon: CircleDot
    },
    {
      name: "Car service",
      description: "Comprehensive car servicing to keep your vehicle in top condition.",
      icon: Car
    },
    {
      name: "Engine overhaul",
      description: "Complete gearbox and engine overhaul services for all makes and models.",
      icon: Cog
    },
    {
      name: "Welding",
      description: "Custom welding and fabrication services for automotive needs.",
      icon: Flame
    },
    {
      name: "Car sales",
      description: "Quality pre-owned vehicles and assistance in finding your perfect car.",
      icon: ShoppingCart
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
      description: "Coming soon: Schedule your service appointments online with ease.",
      icon: Globe
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800">
      <NotificationBanner />
      <header className="bg-white shadow-md sticky top-[32px] z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 p-2">
              <img src="/logoalbercy.png" alt="Company Logo" className="h-10 w-auto md:h-14"/>
            </div>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4 font-['Orbitron'] text-sm">
              <li><a href="#" className="hover:text-[#5900ff] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#5900ff] transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-[#5900ff] transition-colors">Contact</a></li>
            </ul>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#5900ff]">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-2 p-4 font-['Orbitron'] text-sm">
              <li><a href="#" className="hover:text-[#5900ff] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#5900ff] transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-[#5900ff] transition-colors">Contact</a></li>
            </ul>
          </div>
        )}
      </header>

      <main className="mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 bg-[#5900ff] text-white py-16 rounded-lg shadow-lg"
        >
          <h2 className="text-4xl font-bold mb-4 font-['Orbitron']">Expanding Our Online Presence</h2>
          <p className="text-xl mb-8">
            We're working hard to bring our top-notch automotive solutions online. 
            Stay tuned for exciting digital services coming your way!
          </p>
          <p className="text-lg mb-8">
            While we enhance our online offerings, our physical location remains fully operational. 
            Visit us for the same great service you've always known!
          </p>
          <button
            onClick={() => setIsContactPopupOpen(true)}
            className="inline-block bg-white text-[#5900ff] px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors"
          >
            Get Notified at Launch
          </button>
        </motion.section>

        <motion.section 
          id="services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center font-['Orbitron'] text-[#5900ff]">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 duration-300 border-2 border-[#5900ff]/10"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#5900ff]/10 p-3 rounded-full mr-4">
                    <service.icon className="h-6 w-6 text-[#5900ff]" />
                  </div>
                  <h3 className="text-xl font-semibold font-['Orbitron']">{service.name}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
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
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2024 Albercy Auto Clinic. All rights reserved.</p>
        </div>
      </footer>
      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
    </div>
  )
}

