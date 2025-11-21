import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key.toLowerCase() === 'k'
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onCustomOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onCustomOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onCustomOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    } else {
      setQuery('')
    }
  }, [open])

  const actions = [
    { label: 'New Note', hint: 'Create a fresh page', k: 'N' },
    { label: 'Summarize Selection', hint: 'AI compresses highlighted text', k: 'S' },
    { label: 'Open Knowledge Graph', hint: 'Jump to constellation', k: 'G', href: '#graph' },
    { label: 'Toggle Focus Mode', hint: 'Dim distractions', k: 'F' },
    { label: 'Run Code Cell', hint: 'Execute current block', k: 'Enter' },
  ]

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="absolute left-1/2 top-[15%] -translate-x-1/2 w-[92%] max-w-2xl rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_10px_80px_rgba(99,102,241,0.35)]"
          >
            <div className="flex items-center gap-3 px-4 pt-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_12px_6px_rgba(16,185,129,0.35)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask or command (⌘K) — e.g., ‘summarize page’, ‘jump to graph’"
                className="w-full bg-transparent outline-none text-white placeholder:text-slate-400 py-3"
              />
              <kbd className="hidden md:block text-xs text-slate-300/80 bg-white/5 border border-white/10 rounded px-2 py-1">ESC</kbd>
            </div>
            <div className="px-2 pb-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-3" />
              <ul className="max-h-80 overflow-y-auto">
                {filtered.map((a, i) => (
                  <li key={i} className="group">
                    <a
                      href={a.href || '#'}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5"
                    >
                      <div>
                        <div className="text-white font-medium">{a.label}</div>
                        <div className="text-xs text-slate-400">{a.hint}</div>
                      </div>
                      <div className="text-[10px] text-slate-300/80 bg-white/5 border border-white/10 rounded px-2 py-1">{a.k}</div>
                    </a>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <div className="px-4 py-6 text-slate-400">No matches. Try another command.</div>
                )}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
