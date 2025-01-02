'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: "We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make, and the products and features you use."
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: "We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations."
    },
    {
      title: "How We Protect Your Information",
      icon: Shield,
      content: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure."
    },
    {
      title: "Your Privacy Rights",
      icon: Lock,
      content: "In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time. In some regions, you have the right to request deletion of your personal data or to receive a copy of the personal data we hold about you."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 font-['Orbitron'] text-[#5900ff]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          className="text-lg mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          At Albercy Auto Clinic, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and protection of your data.
        </motion.p>

        {sections.map((section, index) => (
          <motion.section
            key={index}
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 font-['Orbitron'] text-[#5900ff] flex items-center">
              <section.icon className="mr-2 h-6 w-6" />
              {section.title}
            </h2>
            <p className="text-gray-700">{section.content}</p>
          </motion.section>
        ))}

        <motion.section
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 font-['Orbitron'] text-[#5900ff]">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about our Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@albercy.com<br />
            <strong>Phone:</strong> +254 (020) 800-0664<br />
            <strong>Address:</strong> Kenyatta Av, Dar es Salaam Rd, Shell Petrol Stn, GPO Nairobi, Kenya
          </p>
        </motion.section>

        <motion.p
          className="mt-12 text-sm text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>
      </div>
    </div>
  )
}

