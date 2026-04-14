import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full blur-3xl"
        />
      </div>

      <div className="text-center max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-9xl tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              404
            </div>
            <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-5xl mb-6 tracking-tight">
            Lost in the Neural Network
          </h1>
          
          <p className="text-xl text-white/60 mb-12 leading-relaxed">
            This page doesn't exist in our reality. Perhaps it's in another dimension, 
            or maybe the AI hasn't generated it yet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <Home className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Return Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-full hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
