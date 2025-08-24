import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
    selectStation?: (stationId: number) => void;
  }
}

interface Station {
  id: number;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  hours: string;
}

interface GoogleMapProps {
  stations?: Station[];
  center?: { lat: number; lng: number };
  onStationSelect?: (station: Station) => void;
  height?: string;
  showStations?: boolean;
}

const GoogleMap = ({ 
  stations = [], 
  center = { lat: 9.0820, lng: 8.6753 }, // Center of Nigeria
  onStationSelect,
  height = "500px",
  showStations = true
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: showStations && stations.length > 0 ? 6 : 10,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#1e293b"}]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ffffff"}]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#0f172a"}]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#334155"}]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add markers for stations
      if (showStations && stations.length > 0) {
        stations.forEach((station) => {
          const marker = new window.google.maps.Marker({
            position: station.coordinates,
            map: map,
            title: station.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#ef4444',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: bold;">${station.name}</h3>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${station.address}</p>
                <div style="margin-bottom: 12px; font-size: 12px; color: #9ca3af;">
                  <div style="margin-bottom: 4px;">📞 ${station.phone}</div>
                  <div>🕒 ${station.hours}</div>
                </div>
                <button 
                  onclick="window.selectStation(${station.id})"
                  style="
                    width: 100%; 
                    background: #ef4444; 
                    color: white; 
                    border: none; 
                    padding: 8px 12px; 
                    border-radius: 6px; 
                    cursor: pointer; 
                    font-size: 12px;
                    transition: background-color 0.2s;
                  "
                  onmouseover="this.style.backgroundColor='#dc2626'"
                  onmouseout="this.style.backgroundColor='#ef4444'"
                >
                  Get Directions
                </button>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        // Global function for station selection
        window.selectStation = (stationId: number) => {
          const selectedStation = stations.find(s => s.id === stationId);
          if (selectedStation && onStationSelect) {
            onStationSelect(selectedStation);
          }
        };
      }
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO8X3_n0_6oc&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup
      if (window.selectStation) {
        delete window.selectStation;
      }
    };
  }, [stations, center, onStationSelect, showStations]);

  return (
    <Card className="card-3d overflow-hidden">
      <div 
        ref={mapRef}
        className="w-full rounded-lg"
        style={{ height }}
      />
      {showStations && (
        <div className="absolute top-4 left-4 z-10">
          <Card className="p-3 bg-black/80 backdrop-blur-sm border-accent/30">
            <p className="text-white text-sm font-medium">
              📍 {stations.length} Stations Available
            </p>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default GoogleMap;