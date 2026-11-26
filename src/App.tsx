import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { ProjectPage } from './pages/ProjectPage';

// Helper component to handle in-page hash scrolling and page changes
function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: Math.max(0, elementPosition - navbarHeight),
            behavior: 'smooth'
          });
        }
      };

      const timer1 = setTimeout(scrollToTarget, 100);
      const timer2 = setTimeout(scrollToTarget, 350);
      const timer3 = setTimeout(scrollToTarget, 650);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
