"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2">
            <img src="/logoalbercy.png" alt="Albercy Auto Clinic" className="h-10 w-auto md:h-14"/>
          </div>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4 font-['Orbitron'] text-sm">
            <li><Link href="/" className="hover:text-[#5900ff] transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-[#5900ff] transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-[#5900ff] transition-colors">Contact</Link></li>
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
            <li><Link href="/" className="hover:text-[#5900ff] transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-[#5900ff] transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-[#5900ff] transition-colors">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header

