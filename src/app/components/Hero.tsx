import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center pt-32 pb-20 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-black/40 font-bold mb-10">
            Institutional Quality • Exclusive Access
          </span>
          <h1 
            className="text-7xl lg:text-[10rem] leading-none mb-14 text-black font-semibold tracking-tighter"
          >
            AD NOIR
          </h1>
          <div className="w-20 h-0.5 bg-black/10 mx-auto mb-14" />
          <p 
            className="mx-auto max-w-2xl text-xl lg:text-2xl text-black/60 leading-relaxed mb-16 font-normal tracking-tight"
          >
            Providing sophisticated capital with access to high-yield, 
            institutional-grade real estate opportunities across premier U.S. markets.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 bg-black rounded-full text-white px-12 py-6 text-xs tracking-[0.3em] uppercase font-bold hover:bg-black/80 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
            >
              View Portfolio
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
