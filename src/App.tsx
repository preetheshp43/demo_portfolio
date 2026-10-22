import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

const MainApp: React.FC = () => {
  const [loaderExiting, setLoaderExiting] = useState(false);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [forceLoaderProgress, setForceLoaderProgress] = useState<number | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('preview_loader');
    if (p !== null) {
      setForceLoaderProgress(parseInt(p, 10));
    }
    if (params.get('preview_exit') === 'true') {
      setLoaderExiting(true);
    }
  }, []);

  const handleLoaderExitStart = () => {
    setLoaderExiting(true);
  };

  const handleLoaderComplete = () => {
    setLoaderFinished(true);
  };

  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-paper text-light-text dark:text-ink font-body selection:bg-accent selection:text-paper transition-colors duration-300">
      {/* Custom Desktop Ring Cursor */}
      <Cursor />

      {/* Page Loader */}
      {!loaderFinished && (
        <Loader
          onExitStart={handleLoaderExitStart}
          onComplete={handleLoaderComplete}
          forceProgress={forceLoaderProgress}
        />
      )}

      {/* Sticky Minimal Navbar with Theme Toggle & Active Highlight */}
      <Navbar visible={loaderExiting || loaderFinished} />

      {/* Main Portfolio Sections */}
      <main id="main-content">
        <Hero readyToAnimate={loaderExiting || loaderFinished} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer with Back-to-Top Button */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

export default App;
