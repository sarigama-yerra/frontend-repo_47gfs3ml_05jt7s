import Hero from './components/Hero'
import NeuralGraph from './components/NeuralGraph'
import Bento from './components/Bento'
import AmbientLights from './components/AmbientLights'
import Presence from './components/Presence'

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Presence />
      <AmbientLights />

      {/* Ethereal header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-[0_0_25px_rgba(236,72,153,0.45)]" />
            <span className="font-bold tracking-tight">Living Learning</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#graph" className="hover:text-white">Graph</a>
            <a href="#bento" className="hover:text-white">Fluid UI</a>
            <a href="/test" className="hover:text-white">System Test</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <NeuralGraph />
        <Bento />
      </main>

      <footer className="py-10 text-center text-slate-400">
        Built for 2030 vibes • Ethereal, kinetic, and alive
      </footer>
    </div>
  )
}

export default App
