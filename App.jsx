import './App.css'

import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {

  return (
    <div className="bg-[#0a1128] min-h-screen">
      <Hero />
      <Portfolio />
      <Experience />
      <Contact />
    </div>
  )
}

export default App
