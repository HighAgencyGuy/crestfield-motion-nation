import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234-801-234-5678", "+234-809-876-5432"],
      description: "Speak directly with our customer service team"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@crestfieldnigeria.com", "sales@crestfieldnigeria.com"],
      description: "Send us a message and we'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Corporate Head Office", "Plot 15, Industrial Estate, Lagos"],
      description: "Come see our facilities and meet our team"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM"],
      description: "We're here when you need us most"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you soon.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: ""
    });
  };

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
              Get In 
              <motion.span 
                className="block gradient-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Touch
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Ready to discuss your petroleum supply needs? Our team is here to help 
              you find the perfect solution for your business.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
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
              Contact Information
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose what works best for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="card-3d p-6 text-center h-full">
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-heading font-bold text-white mb-4">
                      {info.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-accent font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>

                    <p className="text-white/70 text-sm">
                      {info.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-primary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="card-3d p-8">
                <h2 className="text-3xl font-heading font-bold text-white mb-6">
                  Send Us a Message
                </h2>
                <p className="text-white/80 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="service"
                      placeholder="Service of Interest"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60 resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full btn-3d gradient-accent text-white font-semibold"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="card-3d p-8">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  Quick Response Guarantee
                </h3>
                <p className="text-white/80 mb-6">
                  We understand that time is critical in the petroleum business. 
                  That's why we guarantee a response to all inquiries within 24 hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 gradient-accent rounded-full" />
                    <span className="text-white/70">Email responses within 4-6 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 gradient-accent rounded-full" />
                    <span className="text-white/70">Phone calls returned same day</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 gradient-accent rounded-full" />
                    <span className="text-white/70">Emergency contacts available 24/7</span>
                  </div>
                </div>
              </Card>

              <Card className="card-3d p-8">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  Emergency Contact
                </h3>
                <p className="text-white/80 mb-6">
                  For urgent fuel supply needs or emergencies, contact our 24/7 hotline.
                </p>
                <div className="space-y-4">
                  <Button 
                    className="w-full btn-3d gradient-accent text-white justify-start"
                    asChild
                  >
                    <a href="tel:+2348012345678">
                      <Phone className="w-5 h-5 mr-3" />
                      Emergency Hotline: +234-801-234-5678
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-white justify-start"
                    asChild
                  >
                    <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="w-5 h-5 mr-3" />
                      WhatsApp Support
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Visit Our Head Office
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Located in the heart of Lagos Industrial Estate. Easy access from all major routes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="card-3d p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4">
                    Corporate Head Office
                  </h3>
                  <div className="space-y-4 text-white/80">
                    <p>Plot 15, Industrial Estate</p>
                    <p>Ikeja, Lagos State</p>
                    <p>Nigeria</p>
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="text-accent font-semibold">Parking Available</p>
                    <p className="text-accent font-semibold">Accessible by Public Transport</p>
                  </div>
                </div>
                <div className="min-h-[300px] bg-gradient-primary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
                    <p className="text-white/70">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;