import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function NeuralGraph() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const dpr = window.devicePixelRatio || 1
    function resize() {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = w * dpr
      canvas.height = Math.min(h * 0.8, 720) * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = Math.min(h * 0.8, 720) + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Simple particle galaxy
    const nodes = Array.from({ length: 90 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * Math.min(window.innerHeight * 0.8, 720),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }))

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // ambient fog
      const g = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2)
      g.addColorStop(0, 'rgba(168,85,247,0.06)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0,0,canvas.width, canvas.height)

      for (let i=0;i<nodes.length;i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1
        if (n.y < 0 || n.y > Math.min(window.innerHeight * 0.8, 720)) n.vy *= -1

        // connections
        for (let j=i+1;j<nodes.length;j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140) {
            ctx.strokeStyle = `rgba(99,102,241,${0.18 * (1 - dist/140)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        }
      }

      nodes.forEach(n => {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r*4)
        grd.addColorStop(0, 'rgba(255,255,255,0.9)')
        grd.addColorStop(1, 'rgba(99,102,241,0.2)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="graph" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold text-white mb-6"
        >
          Navigate the Neural Constellation
        </motion.h2>
        <p className="text-slate-300/90 max-w-2xl mb-8">
          Zoom from galaxy to solar system to planet. Knowledge is a living graph, not a list. Click a node to refocus.
        </p>
      </div>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full rounded-3xl border border-white/10 bg-black/20 backdrop-blur" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_120px_rgba(99,102,241,0.25)]" />
      </div>
    </section>
  )
}
