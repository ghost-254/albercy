'use client'

import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const WhatsAppChat: React.FC = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="+254208000664"
      accountName="Albercy Auto Clinic"
      allowEsc
      allowClickAway
      notification
      notificationSound
      statusMessage="Typically replies within 1 hour"
      chatMessage="Hello! How can we assist you today?"
      placeholder="Type a message..."
      avatar="/logoalbercy.png"
    />
  )
}

export default WhatsAppChat

