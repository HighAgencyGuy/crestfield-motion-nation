import { useState } from "react";
import { motion } from "framer-motion";
import { X, Navigation, MapPin, Phone, Clock, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
        className="relative z-10 w-full max-w-md mx-4"
      >
        <Card className="card-3d p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Get Directions</h2>
                <p className="text-white/70 text-sm">Navigate to station</p>
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

          {/* Station Info */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-heading font-bold text-white mb-2">{station.name}</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{station.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-white/80 text-sm">{station.hours}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
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

          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-accent text-sm">
              💡 <strong>Tip:</strong> Call ahead to confirm fuel availability and current prices.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DirectionsModal;