import React from 'react'
import Link from 'next/link'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-40 h-16 mb-4">
              <Image
                src="/logoalbercy.png"
                alt="Albercy Auto Clinic"
                layout="fill"
                objectFit="contain"
                className="filter brightness-0 invert"
              />
            </div>
            <p className="text-sm">&copy; 2024 Albercy Auto Clinic. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Orbitron']">Contact Us</h3>
            <p className="flex items-center mb-2"><FaPhone className="mr-2" /> +254 (020) 800-0664</p>
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> info@albercy.com</p>
            <p className="flex items-start"><FaMapMarkerAlt className="mr-2 mt-1" /> Kenyatta Av, Dar es Salaam Rd, Shell Petrol Stn, GPO Nairobi, Kenya</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Orbitron']">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Our Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Orbitron']">Business Hours</h3>
            <p className="mb-2">Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p className="mb-2">Saturday: 9:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

