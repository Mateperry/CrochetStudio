import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function LampDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-yellow-200 bg-clip-text text-transparent"
      >
        Crochet Studio
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-white mt-4 text-sm sm:text-base max-w-md"
      >
        Muñecos tejidos con amor y estilo único. ¡Explora nuestra colección hecha a mano!
      </motion.p>

      <motion.div
        className="mt-6 text-yellow-300 flex items-center justify-center"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [0, 10, 0], opacity: 1 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>
  );
}
