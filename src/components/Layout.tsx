import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-industrial">
      <Navigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16 lg:pt-20"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;