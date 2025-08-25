import { useRef, useEffect, useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
    selectStation?: (stationId: number) => void;
    showDirections?: (lat: number, lng: number) => void;
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
  showDirections?: boolean;
}

const GoogleMap = ({ 
  stations = [], 
  center = { lat: 9.0820, lng: 8.6753 }, // Center of Nigeria
  onStationSelect,
  height = "500px",
  showStations = true,
  showDirections = false
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const directionsServiceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cleanup function for markers and directions
  const cleanupMap = useCallback(() => {
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    }
    
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
  }, []);

  // Initialize directions service
  const initDirectionsService = useCallback(() => {
    if (window.google && !directionsServiceRef.current) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#ef4444',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });
    }
  }, []);

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }, []);

  // Calculate and display directions
  const calculateDirections = useCallback(async (destination: { lat: number; lng: number }) => {
    if (!directionsServiceRef.current || !directionsRendererRef.current || !mapInstanceRef.current) {
      return;
    }

    // Show loading state for directions
    setIsLoading(true);

    try {
      const origin = await getCurrentLocation();
      
      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC
      };

      directionsServiceRef.current.route(request, (result: any, status: any) => {
        if (status === 'OK') {
          directionsRendererRef.current.setDirections(result);
          directionsRendererRef.current.setMap(mapInstanceRef.current);
          
          // Fit map to show entire route
          const bounds = new window.google.maps.LatLngBounds();
          result.routes[0].legs.forEach((leg: any) => {
            bounds.extend(leg.start_location);
            bounds.extend(leg.end_location);
          });
          mapInstanceRef.current.fitBounds(bounds);
        } else {
          console.error('Directions request failed due to:', status);
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error getting directions:', error);
      // Fallback: show route from map center
      const request = {
        origin: center,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC
      };

      directionsServiceRef.current.route(request, (result: any, status: any) => {
        if (status === 'OK') {
          directionsRendererRef.current.setDirections(result);
          directionsRendererRef.current.setMap(mapInstanceRef.current);
        }
        setIsLoading(false);
      });
    }
  }, [center, getCurrentLocation]);

  useEffect(() => {
      const initMap = () => {
    if (!mapRef.current) return;
    
    setIsLoading(true);
    setError(null);

      const mapOptions = {
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
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9ca3af"}]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative'
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // Initialize directions service
      initDirectionsService();

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
            },
            animation: window.google.maps.Animation.DROP
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 16px; max-width: 280px; font-family: 'Inter', sans-serif;">
                <h3 style="margin: 0 0 12px 0; color: #1f2937; font-weight: bold; font-size: 16px;">${station.name}</h3>
                <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">${station.address}</p>
                <div style="margin-bottom: 16px; font-size: 12px; color: #9ca3af;">
                  <div style="margin-bottom: 6px;">📞 ${station.phone}</div>
                  <div>🕒 ${station.hours}</div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button 
                    onclick="window.selectStation(${station.id})"
                    style="
                      flex: 1;
                      background: #ef4444; 
                      color: white; 
                      border: none; 
                      padding: 10px 16px; 
                      border-radius: 6px; 
                      cursor: pointer; 
                      font-size: 13px;
                      font-weight: 500;
                      transition: background-color 0.2s;
                    "
                    onmouseover="this.style.backgroundColor='#dc2626'"
                    onmouseout="this.style.backgroundColor='#ef4444'"
                  >
                    Get Directions
                  </button>
                  <button 
                    onclick="window.showDirections(${station.coordinates.lat}, ${station.coordinates.lng})"
                    style="
                      flex: 1;
                      background: #3b82f6; 
                      color: white; 
                      border: none; 
                      padding: 10px 16px; 
                      border-radius: 6px; 
                      cursor: pointer; 
                      font-size: 13px;
                      font-weight: 500;
                      transition: background-color 0.2s;
                    "
                    onmouseover="this.style.backgroundColor='#2563eb'"
                    onmouseout="this.style.backgroundColor='#3b82f6'"
                  >
                    Show Route
                  </button>
                </div>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          markersRef.current.push(marker);
        });

        // Global functions for station interaction
        window.selectStation = (stationId: number) => {
          const selectedStation = stations.find(s => s.id === stationId);
          if (selectedStation && onStationSelect) {
            onStationSelect(selectedStation);
          }
        };

        window.showDirections = (lat: number, lng: number) => {
          calculateDirections({ lat, lng });
        };
      }
      
      setIsLoading(false);
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      const apiKey = (window as any).GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dO8X3_n0_6oc';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setError('Failed to load Google Maps API. Please check your internet connection and try again.');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup
      cleanupMap();
      if (window.selectStation) {
        delete window.selectStation;
      }
      if (window.showDirections) {
        delete window.showDirections;
      }
    };
  }, [stations, center, onStationSelect, showStations, cleanupMap, initDirectionsService, calculateDirections]);

  return (
    <Card className="card-3d overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-white text-sm">Loading Map...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center p-4">
            <p className="text-red-400 text-sm mb-2">Failed to load map</p>
            <p className="text-red-300 text-xs mb-3">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                // Trigger map reload
                if (mapRef.current) {
                  const script = document.createElement('script');
                  const apiKey = (window as any).GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dO8X3_n0_6oc';
                  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
                  script.async = true;
                  script.defer = true;
                  script.onload = () => {
                    if (window.google) {
                      const initMap = () => {
                        if (!mapRef.current) return;
                        const map = new window.google.maps.Map(mapRef.current, {
                          center: center,
                          zoom: 10,
                          styles: [
                            {
                              "featureType": "all",
                              "elementType": "geometry.fill",
                              "stylers": [{"color": "#1e293b"}]
                            }
                          ]
                        });
                        mapInstanceRef.current = map;
                        setIsLoading(false);
                      };
                      initMap();
                    }
                  };
                  document.head.appendChild(script);
                }
              }}
              className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent/80 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
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
      {showDirections && (
        <div className="absolute top-4 right-4 z-10">
          <Card className="p-3 bg-black/80 backdrop-blur-sm border-accent/30">
            <p className="text-white text-sm font-medium">
              🗺️ Directions Active
            </p>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default GoogleMap;