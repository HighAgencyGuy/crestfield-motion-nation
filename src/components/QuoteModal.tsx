import { useState } from "react";
import { motion } from "framer-motion";
import { X, Fuel, Truck, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [formData, setFormData] = useState({
    customerType: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    fuelType: "",
    quantity: "",
    deliveryLocation: "",
    message: ""
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you within 24 hours with a detailed quote.",
    });
    onClose();
    setFormData({
      customerType: "",
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      fuelType: "",
      quantity: "",
      deliveryLocation: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

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
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <Card className="card-3d p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center">
                <Fuel className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Get Quote</h2>
                <p className="text-white/70">Request a customized fuel supply quote</p>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Type */}
            <div className="space-y-2">
              <label className="text-white font-medium">Customer Type</label>
              <Select value={formData.customerType} onValueChange={(value) => handleInputChange("customerType", value)}>
                <SelectTrigger className="bg-input border-border text-white">
                  <SelectValue placeholder="Select customer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Individual
                    </div>
                  </SelectItem>
                  <SelectItem value="business">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Business
                    </div>
                  </SelectItem>
                  <SelectItem value="fleet">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2" />
                      Fleet/Logistics
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Company Name (shown for business/fleet) */}
            {(formData.customerType === "business" || formData.customerType === "fleet") && (
              <div className="space-y-2">
                <label className="text-white font-medium">Company Name</label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Enter company name"
                  className="bg-input border-border text-white"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white font-medium">Contact Name</label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => handleInputChange("contactName", e.target.value)}
                  placeholder="Your full name"
                  className="bg-input border-border text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-input border-border text-white"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white font-medium">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234-xxx-xxx-xxxx"
                  className="bg-input border-border text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Fuel Type</label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger className="bg-input border-border text-white">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pms">Premium Motor Spirit (PMS)</SelectItem>
                    <SelectItem value="ago">Automotive Gas Oil (AGO)</SelectItem>
                    <SelectItem value="dpk">Dual Purpose Kerosene (DPK)</SelectItem>
                    <SelectItem value="mixed">Mixed Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white font-medium">Quantity (Liters)</label>
                <Input
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="e.g., 1000"
                  className="bg-input border-border text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Delivery Location</label>
                <Input
                  value={formData.deliveryLocation}
                  onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                  placeholder="City, State"
                  className="bg-input border-border text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium">Additional Requirements</label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Please specify any special requirements, delivery timeframe, or additional information..."
                className="bg-input border-border text-white min-h-[100px]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-accent/30 hover:border-accent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-3d gradient-accent text-white"
              >
                Submit Quote Request
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuoteModal;