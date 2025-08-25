import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Search, MessageCircle, Clock, Navigation, Fuel, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DirectionsModal from "@/components/DirectionsModal";
import GoogleMap from "@/components/GoogleMap";
import { heroLocator } from "@/lib/images";

const StationLocator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null);

  const stations = [
    {
      id: 1,
      name: "Crestfield Ikeja Central",
      address: "Plot 45, Oba Akran Avenue, Ikeja, Lagos",
      state: "Lagos",
      hours: "24/7",
      phone: "+2349051600569",
      services: ["PMS", "AGO", "DPK", "Car Wash", "Mini Mart"],
      coordinates: { lat: 6.5952, lng: 3.3441 }
    },
    {
      id: 2,
      name: "Crestfield Victoria Island",
      address: "15 Ahmadu Bello Way, Victoria Island, Lagos",
      state: "Lagos", 
      hours: "5:00 AM - 11:00 PM",
      phone: "+2349051600569",
      services: ["PMS", "AGO", "DPK", "ATM"],
      coordinates: { lat: 6.4281, lng: 3.4219 }
    },
    {
      id: 3,
      name: "Crestfield Abuja Express",
      address: "Km 8, Abuja-Kaduna Expressway, Abuja",
      state: "FCT",
      hours: "24/7",
      phone: "+2349051600569",
      services: ["PMS", "AGO", "DPK", "Truck Bay", "Restaurant"],
      coordinates: { lat: 9.0579, lng: 7.4951 }
    },
    {
      id: 4,
      name: "Crestfield Port Harcourt",
      address: "201 Aba Road, Port Harcourt, Rivers",
      state: "Rivers",
      hours: "6:00 AM - 10:00 PM",
      phone: "+2349051600569",
      services: ["PMS", "AGO", "DPK", "Mini Mart"],
      coordinates: { lat: 4.8156, lng: 7.0498 }
    },
    {
      id: 5,
      name: "Crestfield Kano Industrial",
      address: "Industrial Area, Bompai Road, Kano",
      state: "Kano",
      hours: "24/7",
      phone: "+2349051600569",
      services: ["PMS", "AGO", "DPK", "Bulk Supply", "Truck Bay"],
      coordinates: { lat: 12.0022, lng: 8.5919 }
    },
    {
      id: 6,
      name: "Crestfield Ibadan Ring Road",
      address: "Km 12, Lagos-Ibadan Expressway, Ibadan",
      state: "Oyo",
      hours: "5:30 AM - 11:30 PM",
      phone: "+2349051600569",
      services: ["PMS", "AGO", "DPK", "Car Wash"],
      coordinates: { lat: 7.3775, lng: 3.9470 }
    }
  ];

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const states = [...new Set(stations.map(station => station.state))];

  const handleDirections = (station: typeof stations[0]) => {
    setSelectedStation(station);
    setIsDirectionsModalOpen(true);
  };

  const handleSearch = () => {
    // The search is already handled by the filteredStations logic
    // This function can be used for additional search functionality if needed
    console.log('Searching for:', searchTerm);
  };

  const handleWhatsApp = (phone: string) => {
    const whatsappNumber = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent("Hello, I'd like to inquire about your fuel station services.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero" style={{backgroundImage: `url(${heroLocator})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Find Your Nearest 
              <motion.span 
                className="block gradient-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Fuel Station
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Locate Crestfield fuel stations across Nigeria. Quality fuel, 
              reliable service, and convenient locations nationwide.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by location, state, or station name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 pr-16 py-4 text-lg bg-white/95 backdrop-blur-sm border-white/30 text-gray-800 placeholder:text-gray-600 focus:border-accent focus:bg-white shadow-lg"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-accent hover:bg-accent/80 text-white rounded-lg flex items-center justify-center transition-colors shadow-lg"
                  type="button"
                  aria-label="Search stations"
                  title="Search stations"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-primary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 gradient-accent rounded-full flex items-center justify-center shadow-glow">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">{stations.length}</h3>
              <p className="text-white/80">Active Stations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 gradient-accent rounded-full flex items-center justify-center shadow-glow">
                <Navigation className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">{states.length}</h3>
              <p className="text-white/80">States Covered</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 gradient-accent rounded-full flex items-center justify-center shadow-glow">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">24/7</h3>
              <p className="text-white/80">Service Hours</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 gradient-accent rounded-full flex items-center justify-center shadow-glow">
                <Fuel className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">3</h3>
              <p className="text-white/80">Fuel Types</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Station Listings */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Our Locations
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Find the nearest Crestfield station for quality fuel and excellent service
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredStations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-3d p-6 h-full relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-white mb-2">
                        {station.name}
                      </h3>
                      <div className="flex items-center text-white/70 mb-2">
                        <MapPin className="w-4 h-4 mr-2 text-accent" />
                        <span className="text-sm">{station.address}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Fuel className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-white/70">
                      <Clock className="w-4 h-4 mr-2 text-accent" />
                      <span className="text-sm">{station.hours}</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <Phone className="w-4 h-4 mr-2 text-accent" />
                      <span className="text-sm">{station.phone}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Available Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {station.services.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 relative z-10">
                    <Button 
                      size="sm" 
                      className="flex-1 btn-3d gradient-accent text-white relative z-10"
                      onClick={() => handleDirections(station)}
                    >
                      Get Directions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-accent text-accent hover:bg-accent hover:text-white relative z-10"
                      onClick={() => handleWhatsApp(station.phone)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredStations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/60 text-lg">
                No stations found matching your search. Try a different location or clear the search.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-primary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Interactive Station Map
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Find Crestfield stations near you with our interactive map
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <GoogleMap 
              stations={stations} 
              onStationSelect={handleDirections}
              showDirections={false}
            />
          </motion.div>
        </div>
      </section>
      <DirectionsModal
        isOpen={isDirectionsModalOpen}
        onClose={() => setIsDirectionsModalOpen(false)}
        station={selectedStation}
      />
    </div>
  );
};

export default StationLocator;