'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

interface LeafletMapProps {
  onMapClick: (lat: number, lng: number) => void
}

const LeafletMap: React.FC<LeafletMapProps> = ({ onMapClick }) => {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    // Fix Leaflet's default icon path issues
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon.src,
      iconRetinaUrl: markerIcon2x.src,
      shadowUrl: markerShadow.src,
    })

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([-1.2921, 36.8219], 12) // Nairobi coordinates
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)

      mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        onMapClick(lat, lng)

        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng)
        } else {
          markerRef.current = L.marker(e.latlng).addTo(mapRef.current!)
        }
      })

      // Add initial marker
      markerRef.current = L.marker([-1.2921, 36.8219]).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onMapClick])

  return <div id="map" style={{ width: '100%', height: '300px' }} className="mb-4 rounded-md overflow-hidden"></div>
}

export default LeafletMap

