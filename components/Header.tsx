"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LayoutDashboard, LogOut, User, ShieldCheck } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-toastify"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      setIsMenuOpen(false)
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const commonNavItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/#services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/car-sales", label: "Car Sales" },
  ]

  const adminNavItems = [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }]

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2">
            <img src="/logoalbercy.png" alt="Albercy Auto Clinic" className="h-10 w-auto md:h-14" />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-4 font-['Orbitron'] text-sm">
            {commonNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#5900ff] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/emergency-services"
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                Emergency Services
              </Link>
            </li>
          </ul>

          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-[#5900ff] text-[#5900ff] bg-transparent">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="font-['Orbitron'] text-xs">Admin</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {adminNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/admin/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#5900ff]">
                    Admin Login
                  </Button>
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          {!loading && user && (
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="gap-1 border-[#5900ff] text-[#5900ff] bg-transparent">
                <ShieldCheck className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#5900ff] p-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col space-y-2 p-4 font-['Orbitron'] text-sm">
            {commonNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block hover:text-[#5900ff] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {!loading && user && (
              <>
                <li className="border-t pt-2 mt-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Admin Menu</span>
                </li>
                {adminNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 hover:text-[#5900ff] transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors py-2 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </li>
              </>
            )}

            {!loading && !user && (
              <li className="border-t pt-2 mt-2">
                <Link
                  href="/admin/login"
                  className="block text-gray-600 hover:text-[#5900ff] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </li>
            )}

            <li>
              <Link
                href="/emergency-services"
                className="block bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Emergency Services
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
