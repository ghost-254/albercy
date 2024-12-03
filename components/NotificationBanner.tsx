import { motion } from "framer-motion"
import { AlertCircle } from 'lucide-react'

export function NotificationBanner() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-yellow-500 text-white py-2 px-4 text-center fixed w-full z-50"
    >
      <div className="container mx-auto flex items-center justify-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        <p className="text-sm font-medium">
          This site is under development. Stay tuned for full online support coming soon!
        </p>
      </div>
    </motion.div>
  )
}

