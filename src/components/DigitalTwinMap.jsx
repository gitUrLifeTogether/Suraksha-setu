import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function DigitalTwinMap({ activeCrisis }) {
  const [userLocation, setUserLocation] = useState(null);
  // Hotel coordinates (example: Pune, India)
  const hotelLocation = [18.5204, 73.8567];
  const [showFloorPlan, setShowFloorPlan] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => setUserLocation(hotelLocation)
      );
    } else {
      setUserLocation(hotelLocation);
    }
  }, []);

  if (!userLocation) return <div className="bg-gray-800 p-4 text-center">Loading map...</div>;

  // Simple floor plan image (you can replace URL with your own)
  const floorPlanUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Hotel_floor_plan.svg/800px-Hotel_floor_plan.svg.png';
  const bounds = [[userLocation[0] - 0.001, userLocation[1] - 0.001], [userLocation[0] + 0.001, userLocation[1] + 0.001]];

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-bold">📍 Digital Twin – Hotel Location</h3>
        <button onClick={() => setShowFloorPlan(!showFloorPlan)} className="text-xs bg-gray-700 px-2 py-1 rounded">
          {showFloorPlan ? 'Hide' : 'Show'} Floor Plan
        </button>
      </div>
      <div className="h-64 w-full">
        <MapContainer center={userLocation} zoom={17} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
          {showFloorPlan && <ImageOverlay url={floorPlanUrl} bounds={bounds} opacity={0.6} />}
          {activeCrisis && (
            <Marker position={userLocation} icon={L.divIcon({ className: 'bg-red-500 rounded-full w-6 h-6 animate-ping' })}>
              <Popup>🔥 Crisis active: {activeCrisis.type}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}