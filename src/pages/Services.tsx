import { motion } from "framer-motion";
import { useState } from "react";
import { Fuel, Truck, Building, Users, Clock, Shield, ChevronRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuoteModal from "@/components/QuoteModal";

const Services = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const businessServices = [
    {
      icon: Building,
      title: "Bulk Fuel Supply",
      description: "Large-scale petroleum delivery for industrial operations",
      features: [
        "Minimum order quantities from 10,000 liters",
        "Competitive wholesale pricing",
        "Quality certified AGO, PMS, DPK",
        "Industrial lubricants and oils",
        "Custom delivery scheduling"
      ],
      pricing: "Contact for volume-based pricing"
    },
    {
      icon: Truck,
      title: "Fleet Management",
      description: "Comprehensive fuel solutions for vehicle fleets",
      features: [
        "24/7 emergency fuel delivery",
        "Fleet fuel cards and tracking",
        "Usage analytics and reporting",
        "Route optimization consultancy",
        "Preventive maintenance support"
      ],
      pricing: "Starting from ₦180/liter + service fees"
    },
    {
      icon: Shield,
      title: "Storage Solutions",
      description: "Safe and secure fuel storage facilities",
      features: [
        "Underground storage tanks",
        "Above-ground tank installations",
        "Tank monitoring systems",
        "Safety compliance audits",
        "Environmental protection measures"
      ],
      pricing: "Custom installation quotes available"
    }
  ];

  const consumerServices = [
    {
      icon: Fuel,
      title: "Retail Fuel Stations",
      description: "Convenient fuel purchases for individual customers",
      features: [
        "Premium quality PMS (Petrol)",
        "Clean AGO (Diesel)",
        "Household DPK (Kerosene)",
        "Quick service guarantees",
        "Multiple payment options"
      ],
      pricing: "Market competitive rates"
    },
    {
      icon: Users,
      title: "Home Delivery",
      description: "Direct-to-home fuel delivery service",
      features: [
        "Minimum 200 liters for delivery",
        "Same-day delivery available",
        "Quality assurance testing",
        "Safety equipment provided",
        "Professional delivery team"
      ],
      pricing: "₦200/liter + ₦5,000 delivery fee"
    },
    {
      icon: Clock,
      title: "Emergency Supply",
      description: "24/7 emergency fuel delivery service",
      features: [
        "Round-the-clock availability",
        "Priority emergency response",
        "Generator fuel delivery",
        "Backup power solutions",
        "Critical facility support"
      ],
      pricing: "Premium rates apply for emergency service"
    }
  ];

  const additionalServices = [
    "Fuel quality testing and certification",
    "Tank cleaning and maintenance",
    "Environmental compliance consulting",
    "Logistics and transportation management",
    "Custom fuel blending services",
    "Equipment leasing and rental"
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero" style={{backgroundImage: 'url(/src/assets/hero-services.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
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
              Our 
              <motion.span 
                className="block gradient-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Services
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Comprehensive petroleum supply solutions for businesses and individuals. 
              Reliable delivery, competitive pricing, and exceptional service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs */}
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
              Tailored Solutions
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choose the service package that best fits your needs
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-primary/50 p-2 rounded-xl">
              <TabsTrigger 
                value="business" 
                className="text-lg font-semibold py-4 data-[state=active]:bg-accent data-[state=active]:text-white transition-all duration-300"
              >
                Business Solutions
              </TabsTrigger>
              <TabsTrigger 
                value="consumer" 
                className="text-lg font-semibold py-4 data-[state=active]:bg-accent data-[state=active]:text-white transition-all duration-300"
              >
                Consumer Services
              </TabsTrigger>
            </TabsList>

            <TabsContent value="business">
              <div className="grid lg:grid-cols-3 gap-8">
                {businessServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="card-3d p-8 h-full">
                        <motion.div
                          whileHover={{ scale: 1.1, rotateY: 10 }}
                          className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mb-6 shadow-glow"
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <h3 className="text-2xl font-heading font-bold text-white mb-4">
                          {service.title}
                        </h3>

                        <p className="text-white/80 mb-6">
                          {service.description}
                        </p>

                        <ul className="space-y-3 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-white/70">
                              <Check className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-6 border-t border-white/20">
                          <p className="text-accent font-semibold mb-4">{service.pricing}</p>
                          <Button 
                            className="w-full btn-3d gradient-accent text-white"
                            onClick={() => setIsQuoteModalOpen(true)}
                          >
                            Get Quote
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="consumer">
              <div className="grid lg:grid-cols-3 gap-8">
                {consumerServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="card-3d p-8 h-full">
                        <motion.div
                          whileHover={{ scale: 1.1, rotateY: 10 }}
                          className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mb-6 shadow-glow"
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <h3 className="text-2xl font-heading font-bold text-white mb-4">
                          {service.title}
                        </h3>

                        <p className="text-white/80 mb-6">
                          {service.description}
                        </p>

                        <ul className="space-y-3 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-white/70">
                              <Check className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-6 border-t border-white/20">
                          <p className="text-accent font-semibold mb-4">{service.pricing}</p>
                          <Button className="w-full btn-3d gradient-accent text-white">
                            Order Now
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-primary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Additional Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive support services to meet all your petroleum needs
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="card-3d p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 gradient-accent rounded-full flex-shrink-0" />
                    <span className="text-white/80">{service}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contact our team to discuss your specific requirements and get a tailored quote.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="btn-3d gradient-accent text-white font-semibold px-8 py-4 text-lg"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                Request Custom Quote
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                onClick={() => {
                  window.location.href = '/contact#message-section';
                }}
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
};

export default Services;