import { motion } from 'framer-motion'

function Glow({ className, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay }}
      className={`pointer-events-none absolute blur-3xl rounded-full ${className}`}
      style={{
        background:
          `radial-gradient(closest-side, ${color} 0%, rgba(0,0,0,0) 70%)`,
        filter: 'saturate(140%)',
      }}
    />
  )
}

export default function AmbientLights() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0">
      <Glow className="w-[60vw] h-[60vw] top-[-10%] left-[-10%]" color="rgba(99,102,241,0.25)" />
      <Glow className="w-[50vw] h-[50vw] bottom-[-15%] right-[-10%]" color="rgba(236,72,153,0.2)" delay={0.1} />
      <Glow className="w-[35vw] h-[35vw] top-[20%] right-[20%]" color="rgba(34,197,94,0.18)" delay={0.2} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]" />
    </div>
  )
}
