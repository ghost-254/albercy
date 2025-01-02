'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Wrench, Car, Battery, Cpu, ShoppingCart, PhoneCall } from 'lucide-react'
import { Button } from "@/components/ui/button"

const ServiceSection = ({ title, description, imageSrc, imageAlt, isReversed = false }: 
    {title: string, description: string, imageSrc: string, imageAlt: string, isReversed?: boolean}) => {
  const textOrder = isReversed ? 'md:order-2' : ''
  const imageOrder = isReversed ? 'md:order-1' : ''

  return (
    <div className="flex flex-col md:flex-row items-center mb-16">
      <motion.div 
        className={`w-full md:w-1/2 mb-8 md:mb-0 ${textOrder}`}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-4 font-['Orbitron'] text-[#5900ff]">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </motion.div>
      <motion.div 
        className={`w-full md:w-1/2 ${imageOrder}`}
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 font-['Orbitron'] text-[#5900ff]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Albercy Auto Clinic
        </motion.h1>

        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-xl mb-6">
            Albercy Auto Clinic is your comprehensive automotive solution. From expert repairs and maintenance to quality car sales and emergency roadside assistance, we're here to meet all your vehicle needs.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <Wrench className="h-12 w-12 text-[#5900ff] mb-2" />
              <span className="font-bold">Expert Technicians</span>
            </div>
            <div className="flex flex-col items-center">
              <Car className="h-12 w-12 text-[#5900ff] mb-2" />
              <span className="font-bold">State-of-the-Art Equipment</span>
            </div>
            <div className="flex flex-col items-center">
              <Battery className="h-12 w-12 text-[#5900ff] mb-2" />
              <span className="font-bold">Quality Parts</span>
            </div>
            <div className="flex flex-col items-center">
              <ShoppingCart className="h-12 w-12 text-[#5900ff] mb-2" />
              <span className="font-bold">Car Sales</span>
            </div>
          </div>
        </motion.section>

        <ServiceSection
          title="Comprehensive Diagnostics"
          description="Our advanced diagnostic services utilize cutting-edge technology to accurately identify and resolve issues with your vehicle. Our expert technicians can quickly pinpoint problems, saving you time and ensuring precise repairs."
          imageSrc="/diag3.jpg"
          imageAlt="Comprehensive Diagnostics"
        />

        <ServiceSection
          title="Engine Overhaul and Repair"
          description="From minor repairs to complete engine overhauls, our skilled mechanics have the expertise to handle all your engine needs. We use high-quality parts and advanced techniques to restore your engine's performance and extend its lifespan."
          imageSrc="/eng4.jpg"
          imageAlt="Engine Overhaul and Repair"
          isReversed={true}
        />

        <ServiceSection
          title="Electrical Systems and Telematics"
          description="We specialize in diagnosing and repairing complex electrical systems in modern vehicles. Our telematics services provide advanced vehicle tracking and fleet management solutions, helping you optimize your vehicle's performance and efficiency."
          imageSrc="/tel7.jpg"
          imageAlt="Electrical Systems and Telematics"
        />

        <ServiceSection
          title="Quality Car Sales"
          description="Looking for your next vehicle? Albercy Auto Clinic offers a curated selection of quality used and new cars. Our experienced sales team is dedicated to helping you find the perfect car that meets your needs and budget. Each vehicle undergoes a thorough inspection to ensure reliability and value."
          imageSrc="/car8.jpg"
          imageAlt="Quality Car Sales"
          isReversed={true}
        />

        <ServiceSection
          title="24/7 Emergency Roadside Assistance"
          description="We understand that vehicle emergencies don't follow a schedule. That's why Albercy Auto Clinic offers round-the-clock emergency roadside assistance. Whether you're stuck with a flat tire, dead battery, or any other roadside issue, our team is just a call away, ready to get you back on the road safely."
          imageSrc="/roadside.jpg"
          imageAlt="Emergency Roadside Assistance"
        />

        <motion.section
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 font-['Orbitron'] text-[#5900ff]">Why Choose Albercy Auto Clinic?</h2>
          <p className="text-xl mb-8">
            At Albercy, we're committed to providing exceptional service, transparent communication, and lasting results. Our team of certified professionals is dedicated to keeping your vehicle in top condition, ensuring your safety and satisfaction on the road.
          </p>
          <div className="bg-[#5900ff] text-white py-8 px-6 rounded-lg shadow-lg mb-8">
            <Cpu className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg font-semibold mb-6">
              Experience the Albercy difference today. Schedule your appointment and let us take care of all your automotive needs with precision and care.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="font-['Orbitron']">
                  Make an Appointment
                </Button>
              </Link>
              <Link href="/car-sales">
                <Button variant="outline" size="lg" className="font-['Orbitron'] bg-white text-[#5900ff] hover:bg-gray-100">
                  Explore Cars for Sale
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-red-600 text-white py-6 px-6 rounded-lg shadow-lg">
            <PhoneCall className="h-12 w-12 mx-auto mb-2" />
            <p className="text-lg font-semibold mb-2">24/7 Emergency Roadside Assistance</p>
            <p className="text-xl font-bold">Call: +254 (020) 800-0664</p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

