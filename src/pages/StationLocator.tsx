import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Search, Phone, Clock, Navigation, Fuel } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StationLocator = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stations = [
    {
      id: 1,
      name: "Crestfield Ikeja Central",
      address: "Plot 45, Oba Akran Avenue, Ikeja, Lagos",
      state: "Lagos",
      hours: "24/7",
      phone: "+234-801-234-5678",
      services: ["PMS", "AGO", "DPK", "Car Wash", "Mini Mart"],
      coordinates: { lat: 6.5952, lng: 3.3441 }
    },
    {
      id: 2,
      name: "Crestfield Victoria Island",
      address: "15 Ahmadu Bello Way, Victoria Island, Lagos",
      state: "Lagos", 
      hours: "5:00 AM - 11:00 PM",
      phone: "+234-801-234-5679",
      services: ["PMS", "AGO", "DPK", "ATM"],
      coordinates: { lat: 6.4281, lng: 3.4219 }
    },
    {
      id: 3,
      name: "Crestfield Abuja Express",
      address: "Km 8, Abuja-Kaduna Expressway, Abuja",
      state: "FCT",
      hours: "24/7",
      phone: "+234-809-876-5432",
      services: ["PMS", "AGO", "DPK", "Truck Bay", "Restaurant"],
      coordinates: { lat: 9.0579, lng: 7.4951 }
    },
    {
      id: 4,
      name: "Crestfield Port Harcourt",
      address: "201 Aba Road, Port Harcourt, Rivers",
      state: "Rivers",
      hours: "6:00 AM - 10:00 PM",
      phone: "+234-803-123-4567",
      services: ["PMS", "AGO", "DPK", "Mini Mart"],
      coordinates: { lat: 4.8156, lng: 7.0498 }
    },
    {
      id: 5,
      name: "Crestfield Kano Industrial",
      address: "Industrial Area, Bompai Road, Kano",
      state: "Kano",
      hours: "24/7",
      phone: "+234-805-987-6543",
      services: ["PMS", "AGO", "DPK", "Bulk Supply", "Truck Bay"],
      coordinates: { lat: 12.0022, lng: 8.5919 }
    },
    {
      id: 6,
      name: "Crestfield Ibadan Ring Road",
      address: "Km 12, Lagos-Ibadan Expressway, Ibadan",
      state: "Oyo",
      hours: "5:30 AM - 11:30 PM",
      phone: "+234-807-456-7890",
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

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
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
                  className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent"
                />
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
                <Card className="card-3d p-6 h-full">
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

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 btn-3d gradient-accent text-white"
                    >
                      Get Directions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-accent text-accent hover:bg-accent hover:text-white"
                    >
                      Call
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

      {/* Map Section Placeholder */}
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
              Coming soon: Interactive map showing all Crestfield locations with real-time fuel availability
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="card-3d p-8 text-center min-h-[400px] flex items-center justify-center">
              <div>
                <div className="w-24 h-24 mx-auto mb-6 gradient-accent rounded-full flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  Interactive Map Coming Soon
                </h3>
                <p className="text-white/70 mb-6">
                  We're working on an interactive map feature that will help you find stations, 
                  check fuel availability, and get real-time directions.
                </p>
                <Button className="btn-3d gradient-accent text-white">
                  Notify Me When Ready
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StationLocator;