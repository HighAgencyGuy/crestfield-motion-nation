import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

interface Station {
  id: number;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  hours: string;
}

interface InteractiveMapProps {
  stations: Station[];
  onStationSelect?: (station: Station) => void;
}

const InteractiveMap = ({ stations, onStationSelect }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [8.6753, 9.0820], // Center of Nigeria
      zoom: 6,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each station
    stations.forEach((station) => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3">
          <h3 class="font-bold text-gray-900 mb-2">${station.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${station.address}</p>
          <div class="space-y-1 text-xs text-gray-500">
            <p>📞 ${station.phone}</p>
            <p>🕒 ${station.hours}</p>
          </div>
          <button 
            onclick="window.dispatchEvent(new CustomEvent('stationSelect', { detail: ${station.id} }))"
            class="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 px-2 rounded transition-colors"
          >
            Get Directions
          </button>
        </div>
      `);

      // Create marker
      new mapboxgl.Marker(markerElement)
        .setLngLat([station.coordinates.lng, station.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Listen for station selection from popup
    window.addEventListener('stationSelect', (event: any) => {
      const stationId = event.detail;
      const selectedStation = stations.find(s => s.id === stationId);
      if (selectedStation && onStationSelect) {
        onStationSelect(selectedStation);
      }
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      setTimeout(initializeMap, 100);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="card-3d p-8 text-center min-h-[500px] flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="w-20 h-20 mx-auto mb-6 gradient-accent rounded-full flex items-center justify-center">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-white mb-4">
            Interactive Station Map
          </h3>
          <p className="text-white/70 mb-6">
            To display the interactive map, please enter your Mapbox public token.
            Get your free token at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-glow underline"
            >
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="bg-input border-border text-white"
              required
            />
            <Button 
              type="submit" 
              className="w-full btn-3d gradient-accent text-white"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Load Interactive Map
            </Button>
          </form>
        </div>
      </Card>
    );
  }

  return (
    <Card className="card-3d overflow-hidden">
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] rounded-lg"
        style={{ minHeight: '500px' }}
      />
      <div className="absolute top-4 left-4 z-10">
        <Card className="p-3 bg-black/80 backdrop-blur-sm border-accent/30">
          <p className="text-white text-sm font-medium">
            📍 {stations.length} Stations Nationwide
          </p>
        </Card>
      </div>
    </Card>
  );
};

export default InteractiveMap;