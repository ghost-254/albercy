'use client'

import dynamic from 'next/dynamic';
import React from 'react';

const FloatingWhatsAppComponent = dynamic(
  () => import('react-floating-whatsapp').then((mod) => mod.FloatingWhatsApp),
  { ssr: false }
);

const WhatsAppChat: React.FC = () => {
  const avatarUrl = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return `data:image/svg+xml;base64,${btoa(
        new XMLSerializer().serializeToString(
          new DOMParser().parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
              <rect width="100" height="100" fill="#0078FF" />
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#FFF" font-size="50" font-family="Arial">
                A
              </text>
            </svg>`,
            'image/svg+xml'
          ).documentElement
        )
      )}`;
    }
    return '';
  }, []);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <FloatingWhatsAppComponent
      phoneNumber="+254705249339"
      accountName="Albercy Auto Clinic"
      avatar={avatarUrl}
      statusMessage="Typically replies within 1 hour"
      chatMessage="Hello! How can we assist you today?"
      placeholder="Type a message..."
      messageDelay={3}
      allowEsc={false}
      allowClickAway={false}
      notification={true}
      notificationSound={true}
      notificationLoop={3}
      notificationDelay={10}
      chatboxHeight={420}
    />
  );
};

export default WhatsAppChat;

