import { useEffect, useRef } from 'react'

export default function Presence() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const handleMove = (e) => {
      const orb = el
      orb.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`
      orb.style.boxShadow = `0 0 24px 8px rgba(99,102,241,0.35), inset 0 0 12px rgba(255,255,255,0.35)`
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div ref={ref} className="fixed top-0 left-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 mix-blend-screen opacity-70 pointer-events-none z-50 transition-transform duration-100" />
  )
}
