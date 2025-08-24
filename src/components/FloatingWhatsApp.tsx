import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "+2349051600569";

  const openWhatsApp = (message: string) => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  const quickMessages = [
    "Hello! I'd like to inquire about your fuel services.",
    "Can you provide pricing for bulk fuel supply?",
    "I need information about home delivery services.",
    "What are your current fuel prices?",
    "I'd like to schedule a consultation."
  ];

  return (
    <>
      {/* Main WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75 -z-10" />
      </motion.div>

      {/* Quick Messages Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-2xl p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Start a Conversation</h3>
                    <p className="text-xs text-white/70">Usually replies instantly</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Messages */}
              <div className="space-y-2">
                <p className="text-sm text-white/80 mb-3">Choose a quick message:</p>
                {quickMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => openWhatsApp(message)}
                    className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 transition-all duration-200 text-sm text-white/90 hover:text-white"
                  >
                    {message}
                  </button>
                ))}
              </div>

              {/* Custom Message Button */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <Button
                  onClick={() => openWhatsApp("Hello! I have a question about your services.")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Open WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWhatsApp;