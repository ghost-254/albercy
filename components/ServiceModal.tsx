import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    name: string
    description: string
    icon: React.ElementType
  }
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <service.icon className="h-6 w-6 text-blue-600" />
            {service.name}
          </DialogTitle>
          <DialogDescription>{service.description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            At Albercy, we pride ourselves on delivering top-notch {service.name.toLowerCase()} services. 
            Our team of experienced professionals uses the latest technology and techniques to ensure 
            your vehicle receives the best care possible.
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

