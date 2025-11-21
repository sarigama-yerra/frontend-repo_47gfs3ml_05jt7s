import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient veil for depth without blocking Spline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

      <div className="relative z-10 container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            The Living Learning Engine
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-slate-200/90">
            Not a dashboard — a cockpit for the mind. Ethereal. Kinetic. Designed to feel like it breathes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#graph" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-colors">Explore the Galaxy</a>
            <a href="#bento" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white backdrop-blur border border-white/10 font-semibold">See the Fluid UI</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
