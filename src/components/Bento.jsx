import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function Card({ children, className }) {
  return (
    <motion.div
      layout
      className={`rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  )
}

export default function Bento() {
  const [mode, setMode] = useState('read')

  return (
    <section id="bento" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-4xl font-extrabold text-white">Fluid & Generative Content</h3>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
            {['read','focus','code'].map(v => (
              <button
                key={v}
                onClick={() => setMode(v)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-semibold transition-colors ${mode===v? 'bg-white/20 text-white':'text-slate-300 hover:text-white'}`}
              >
                {v.charAt(0).toUpperCase()+v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          <Card className={`${mode==='read' ? 'md:col-span-4' : mode==='focus' ? 'md:col-span-6' : 'md:col-span-3'} min-h-[220px]`}>
            <h4 className="text-xl font-bold text-white mb-2">Lecture Notes</h4>
            <p className="text-slate-300">Hover complex text to simplify. The interface breathes and adapts to your needs.</p>
            <div className="mt-4 text-slate-200/90">
              <span className="hover:bg-white/10 rounded px-1 transition-colors">Quantum superposition</span> allows particles to be in multiple states at once, until measurement collapses the wavefunction.
            </div>
          </Card>

          <Card className={`${mode==='code' ? 'md:col-span-4' : 'md:col-span-3'} min-h-[220px]`}>
            <h4 className="text-xl font-bold text-white mb-2">Editor</h4>
            <pre className="text-slate-200/90 text-sm bg-black/30 rounded-lg p-4 overflow-auto">
{`function collapse(wave) {
  return Math.random() > 0.5 ? 'spin-up' : 'spin-down'
}`}
            </pre>
          </Card>

          <Card className="md:col-span-3 min-h-[220px]">
            <h4 className="text-xl font-bold text-white mb-2">Summary</h4>
            <p className="text-slate-300">Your AI companion expands this panel when you need clarity, and recedes when you are in flow.</p>
          </Card>

          <AnimatePresence>
            {mode==='focus' && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="md:col-span-3"
              >
                <Card>
                  <h4 className="text-xl font-bold text-white mb-2">Focus Mode</h4>
                  <p className="text-slate-300">Deep, cinematic mode with expanded reading and muted distractions.</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
