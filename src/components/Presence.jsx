import { useEffect, useRef } from 'react'

export default function Presence() {
  const orbRef = useRef(null)
  const trailRef = useRef([])
  const rafRef = useRef(0)

  useEffect(() => {
    const orb = orbRef.current
    const trail = trailRef.current

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const step = () => {
      // Spring towards target
      const k = 0.18
      const d = 0.75
      const vx = (targetX - x) * k
      const vy = (targetY - y) * k
      x += vx
      y += vy

      // Update orb
      const glow = Math.min(1, Math.hypot(vx, vy) / 12)
      orb.style.transform = `translate(${x - 12}px, ${y - 12}px)`
      orb.style.boxShadow = `0 0 ${24 + glow * 24}px ${8 + glow * 6}px rgba(99,102,241,0.35), inset 0 0 12px rgba(255,255,255,0.35)`

      // Trail
      trail.push({ x, y, a: 0.9 })
      if (trail.length > 20) trail.shift()
      for (let i = 0; i < trail.length; i++) {
        trail[i].a *= d
      }

      rafRef.current = requestAnimationFrame(step)
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(step)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={orbRef}
        aria-hidden
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 mix-blend-screen opacity-80 pointer-events-none z-50 transition-transform duration-75"
      />
      {/* Canvas trail using CSS only (soft radial shadows) */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(200px_200px_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.08),transparent_60%)]" />
    </>
  )
}
