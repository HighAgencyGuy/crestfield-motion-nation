import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import GoogleMap from './GoogleMap';

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
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setIsDirectionsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDirectionsModalOpen(false);
    setSelectedStation(null);
  };

  return (
    <>
      <Card className="card-3d overflow-hidden">
        <div className="relative">
          <GoogleMap 
            stations={stations} 
            onStationSelect={handleStationSelect}
            height="500px"
            showStations={true}
            showDirections={false}
          />
          <div className="absolute top-4 left-4 z-10">
            <Card className="p-3 bg-black/80 backdrop-blur-sm border-accent/30">
              <p className="text-white text-sm font-medium">
                📍 {stations.length} Stations Nationwide
              </p>
            </Card>
          </div>
        </div>
      </Card>

      {/* Directions Modal */}
      {selectedStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          
          <div className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
            <Card className="card-3d p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white">Get Directions</h2>
                    <p className="text-white/70 text-sm">Navigate to {selectedStation.name}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseModal}
                  className="border-accent/30 hover:border-accent"
                >
                  ✕
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Station Info & Navigation Options */}
                <div className="space-y-6">
                  {/* Station Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-heading font-bold text-white mb-3">{selectedStation.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <span className="text-white/80 text-sm leading-relaxed">{selectedStation.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-white/80 text-sm">🕒 {selectedStation.hours}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-white/80 text-sm">📞 {selectedStation.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Options */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-white">Choose Navigation App:</h4>
                    
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedStation.coordinates.lat},${selectedStation.coordinates.lng}`;
                          window.open(url, '_blank');
                        }}
                        className="w-full btn-3d gradient-primary text-white justify-between"
                      >
                        <span>Google Maps</span>
                        <span>→</span>
                      </Button>
                      
                      <Button
                        onClick={() => {
                          const url = `http://maps.apple.com/?daddr=${selectedStation.coordinates.lat},${selectedStation.coordinates.lng}`;
                          window.open(url, '_blank');
                        }}
                        variant="outline"
                        className="w-full border-accent/30 hover:border-accent hover:bg-accent/10 justify-between"
                      >
                        <span>Apple Maps</span>
                        <span>→</span>
                      </Button>
                      
                      <Button
                        onClick={() => {
                          const url = `https://waze.com/ul?ll=${selectedStation.coordinates.lat},${selectedStation.coordinates.lng}&navigate=yes`;
                          window.open(url, '_blank');
                        }}
                        variant="outline"
                        className="w-full border-secondary/30 hover:border-secondary hover:bg-secondary/10 justify-between"
                      >
                        <span>Waze</span>
                        <span>→</span>
                      </Button>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-accent text-sm">
                      💡 <strong>Tip:</strong> Call ahead to confirm fuel availability and current prices.
                    </p>
                  </div>
                </div>

                {/* Right Column - Interactive Map */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-3">Station Location:</h4>
                    <div className="min-h-[400px] rounded-lg overflow-hidden">
                      <GoogleMap 
                        center={selectedStation.coordinates}
                        stations={[selectedStation]}
                        height="400px"
                        showStations={true}
                        showDirections={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveMap;