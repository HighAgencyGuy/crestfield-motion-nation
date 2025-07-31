import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Fuel, Truck, MapPin, Clock, Shield, Award, ChevronRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-petroleum.jpg";

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services = [
    {
      icon: Fuel,
      title: "Bulk Fuel Supply",
      description: "Premium petroleum products delivered directly to your business nationwide",
      features: ["AGO (Diesel)", "PMS (Petrol)", "DPK (Kerosene)", "Industrial Lubricants"]
    },
    {
      icon: Truck,
      title: "Fleet Services",
      description: "Comprehensive fuel management solutions for your vehicle fleet",
      features: ["24/7 Delivery", "Fuel Cards", "Usage Analytics", "Route Optimization"]
    },
    {
      icon: MapPin,
      title: "Retail Stations",
      description: "Conveniently located fuel stations across Nigeria for individual customers",
      features: ["Quality Assurance", "Quick Service", "Multiple Locations", "Competitive Pricing"]
    }
  ];

  const stats = [
    { number: "500+", label: "Satisfied Clients", icon: Award },
    { number: "50+", label: "Fuel Stations", icon: MapPin },
    { number: "24/7", label: "Service Hours", icon: Clock },
    { number: "15+", label: "Years Experience", icon: Shield }
  ];

  return (
    <div ref={ref} className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(10, 31, 68, 0.8), rgba(10, 31, 68, 0.6)), url(${heroImage})`
            }}
          />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          className="absolute top-20 left-20 w-20 h-20 gradient-accent rounded-full opacity-20 animate-parallax"
        />
        <motion.div
          style={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          className="absolute bottom-20 right-20 w-32 h-32 border-2 border-accent/30 rounded-lg rotate-45 animate-parallax"
        />

        {/* Hero Content */}
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
              Powering Progress
              <motion.span 
                className="block gradient-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Across Nigeria
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Premium petroleum delivery solutions tailored to your business needs. 
              Reliable, efficient, and nationwide coverage.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button 
                size="lg" 
                className="btn-3d gradient-accent text-white font-semibold px-8 py-4 text-lg group"
                asChild
              >
                <Link to="/locator">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Station
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                asChild
              >
                <Link to="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Get Quote
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    className="w-16 h-16 mx-auto mb-4 gradient-accent rounded-full flex items-center justify-center shadow-glow"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl lg:text-4xl font-bold text-accent mb-2"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-white/80">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              Our Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive petroleum supply solutions for businesses and individuals across Nigeria
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="card-3d p-8 h-full group cursor-pointer">
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotateZ: 5,
                        x: mousePosition.x * 0.5,
                        y: mousePosition.y * 0.5
                      }}
                      className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mb-6 shadow-glow"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-white/80 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                          className="flex items-center text-white/70"
                        >
                          <ChevronRight className="w-4 h-4 text-accent mr-2" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      whileHover={{ x: 10 }}
                      className="mt-6 pt-6 border-t border-white/20"
                    >
                      <Link
                        to="/services"
                        className="text-accent hover:text-accent-glow transition-colors inline-flex items-center group"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Power Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of satisfied clients across Nigeria. Get a custom quote today.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg btn-3d"
                asChild
              >
                <Link to="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Request Quote
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                asChild
              >
                <Link to="/about">
                  Learn About Us
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;