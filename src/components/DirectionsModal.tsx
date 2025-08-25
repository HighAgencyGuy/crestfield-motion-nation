import { useState } from "react";
import { motion } from "framer-motion";
import { X, Navigation, MapPin, Phone, Clock, Copy, ExternalLink, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "./GoogleMap";

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: {
    id: number;
    name: string;
    address: string;
    state: string;
    hours: string;
    phone: string;
    coordinates: { lat: number; lng: number };
  } | null;
}

const DirectionsModal = ({ isOpen, onClose, station }: DirectionsModalProps) => {
  const { toast } = useToast();
  const [showRoute, setShowRoute] = useState(false);

  const copyAddress = () => {
    if (station) {
      navigator.clipboard.writeText(station.address);
      toast({
        title: "Address Copied",
        description: "Station address has been copied to clipboard.",
      });
    }
  };

  const openInGoogleMaps = () => {
    if (station) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.lat},${station.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const openInAppleMaps = () => {
    if (station) {
      const url = `http://maps.apple.com/?daddr=${station.coordinates.lat},${station.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const openInWaze = () => {
    if (station) {
      const url = `https://waze.com/ul?ll=${station.coordinates.lat},${station.coordinates.lng}&navigate=yes`;
      window.open(url, '_blank');
    }
  };

  const toggleRoute = () => {
    setShowRoute(!showRoute);
  };

  if (!isOpen || !station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <Card className="card-3d p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Get Directions</h2>
                <p className="text-white/70 text-sm">Navigate to {station.name}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-accent/30 hover:border-accent"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Station Info & Navigation Options */}
            <div className="space-y-6">
              {/* Station Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-white mb-3">{station.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-white/80 text-sm leading-relaxed">{station.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-white/80 text-sm">{station.hours}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-white/80 text-sm">{station.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAddress}
                    className="border-accent/30 hover:border-accent text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Address
                  </Button>
                </div>
              </div>

              {/* Route Toggle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">Interactive Map</h4>
                  <Button
                    variant={showRoute ? "default" : "outline"}
                    size="sm"
                    onClick={toggleRoute}
                    className={showRoute ? "bg-accent text-white" : "border-accent/30 hover:border-accent"}
                  >
                    <Route className="w-4 h-4 mr-2" />
                    {showRoute ? "Hide Route" : "Show Route"}
                  </Button>
                </div>
                <p className="text-white/60 text-xs">
                  {showRoute 
                    ? "Route visualization is active. The map will show the best driving route to this station."
                    : "Click 'Show Route' to see the driving directions on the map."
                  }
                </p>
              </div>

              {/* Navigation Options */}
              <div className="space-y-3">
                <h4 className="font-medium text-white">Choose Navigation App:</h4>
                
                <div className="space-y-2">
                  <Button
                    onClick={openInGoogleMaps}
                    className="w-full btn-3d gradient-primary text-white justify-between"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={openInAppleMaps}
                    variant="outline"
                    className="w-full border-accent/30 hover:border-accent hover:bg-accent/10 justify-between"
                  >
                    <span>Apple Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={openInWaze}
                    variant="outline"
                    className="w-full border-secondary/30 hover:border-secondary hover:bg-secondary/10 justify-between"
                  >
                    <span>Waze</span>
                    <ExternalLink className="w-4 h-4" />
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
                <h4 className="font-medium text-white mb-3">Station Location & Route:</h4>
                <div className="min-h-[400px] rounded-lg overflow-hidden">
                  <GoogleMap 
                    center={station.coordinates}
                    stations={[station]}
                    height="400px"
                    showStations={true}
                    showDirections={showRoute}
                  />
                </div>
              </div>
              
              {showRoute && (
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-400 text-xs">
                    🗺️ <strong>Route Active:</strong> The map is showing the optimal driving route to this station. 
                    The route will automatically adjust based on current traffic conditions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DirectionsModal;