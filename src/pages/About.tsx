import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, Users, Award, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest standards of honesty and transparency in all our business dealings."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service delivery and customer satisfaction."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We build lasting relationships with our clients based on trust and mutual success."
    }
  ];

  const timeline = [
    { year: "2008", event: "Company Founded", description: "Crestfield Nigeria Limited was established with a vision to transform petroleum supply in Nigeria." },
    { year: "2012", event: "National Expansion", description: "Expanded operations to cover major cities across Nigeria with strategic partnerships." },
    { year: "2016", event: "Fleet Modernization", description: "Invested in modern tanker fleet and advanced logistics technology." },
    { year: "2020", event: "Digital Transformation", description: "Launched digital platforms for real-time tracking and customer management." },
    { year: "2024", event: "Market Leadership", description: "Achieved position as one of Nigeria's leading petroleum supply companies." }
  ];

  return (
    <div ref={ref} className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center" style={{backgroundImage: 'url(/src/assets/hero-about.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0 bg-gradient-hero"
        />
        
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
              About 
              <motion.span 
                className="block gradient-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Crestfield
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Over 15 years of excellence in petroleum supply services across Nigeria. 
              Building partnerships that fuel progress and prosperity.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 mb-6">
                To provide reliable, efficient, and cost-effective petroleum supply solutions 
                that power Nigeria's economic growth while maintaining the highest standards 
                of safety and environmental responsibility.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-white/70">Happy Clients</div>
                </div>
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-2xl font-bold text-accent">50+</div>
                  <div className="text-white/70">Locations</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-6">Our Vision</h2>
              <p className="text-lg text-white/80 mb-6">
                To be Nigeria's most trusted and innovative petroleum supply company, 
                recognized for our commitment to excellence, sustainability, and 
                customer satisfaction.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-white/70">Service</div>
                </div>
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-2xl font-bold text-accent">15+</div>
                  <div className="text-white/70">Years</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The principles that guide every decision we make and every service we deliver
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="card-3d p-8 text-center h-full">
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-heading font-bold text-white mb-4">
                      {value.title}
                    </h3>

                    <p className="text-white/80">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A timeline of growth, innovation, and commitment to excellence
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <Card className="card-3d p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-accent mr-2" />
                      <span className="text-accent font-bold text-lg">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2">
                      {item.event}
                    </h3>
                    <p className="text-white/80">{item.description}</p>
                  </Card>
                </div>

                <div className="w-4 h-4 gradient-accent rounded-full border-4 border-primary flex-shrink-0" />
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;