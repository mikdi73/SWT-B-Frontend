import 'leaflet/dist/leaflet.css'
import { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export type MapViewProps = {
    lat: number
    lng: number
    label?: string
}

export const MapView: FC<MapViewProps> = ({ lat, lng, label }) => (
    <div className="w-full h-128 rounded-lg overflow-hidden z-0">
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
                {label && <Popup>{label}</Popup>}
            </Marker>
        </MapContainer>
    </div>
)

export async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
    const params = new URLSearchParams({
        q: address,
        format: 'json',
        limit: '1'
    })
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`)
    const data = await res.json()
    if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
    }
    return null
}

export const AdresseMap: FC<{ address: string }> = ({ address }) => {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

    useEffect(() => {
        geocode(address).then(setCoords)
    }, [address])

    if (!coords) return <p>Karte wird geladen…</p>
    return <MapView lat={coords.lat} lng={coords.lng} label={address} />
}
