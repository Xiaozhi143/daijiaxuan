import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // 页面加载或刷新时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleProjectExpand = (projectId) => {
    // 可以在这里添加一些逻辑
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar onProjectSelect={handleProjectSelect} />
        <main>
          <Hero />
          <About />
          <Works selectedProject={selectedProject} onProjectExpand={handleProjectExpand} />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  );
}
