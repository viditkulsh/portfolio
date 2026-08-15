import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';

import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/Common/ErrorBoundary';
import TopNav from './components/nav/TopNav';
import CommandPalette from './components/nav/CommandPalette';
import Home from './pages/Home';
import useMotionTier from './hooks/useMotionTier';

import './index.css';

/* Route-level code splitting.
   Home ships in the main chunk because it is what almost everyone loads.
   Everything else — and especially the 3D world — is fetched only when
   asked for, which is what keeps the 3D budget off the critical path (§28). */
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const WorkIndex = lazy(() => import('./pages/WorkIndex'));
const Recruiter = lazy(() => import('./pages/Recruiter'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const Explore = lazy(() => import('./pages/Explore'));

/** Restore scroll on navigation; preserve it when only the hash changes. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const { isStatic } = useMotionTier();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: isStatic ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, isStatic]);

  return null;
}

/**
 * Announce route changes to screen readers.
 *
 * An SPA navigation is silent by default — the URL changes and nothing is
 * announced. This gives assistive tech something to read on every route.
 */
function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Wait a tick so the new page's <title> has been set.
    const id = window.setTimeout(() => setMessage(`Navigated to ${document.title}`), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status">
      <span className="t-mono">Loading…</span>
    </div>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="t-eyebrow mb-4">404</p>
      <h1 className="t-xl mb-4">This page doesn't exist.</h1>
      <p className="t-body mb-8 mx-auto">
        The link may be out of date, or the page may have moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to the portfolio
      </Link>
    </main>
  );
}

function Shell() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="grain min-h-screen">
      {/* First tab stop on every page. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ScrollManager />
      <RouteAnnouncer />
      <TopNav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <main id="main" tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkIndex />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/recruiter" element={<Recruiter />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/explore" element={<Explore />} />
            {/* Legacy routes from the previous three-mode structure. */}
            <Route path="/story" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PortfolioProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Shell />
          </Router>
        </PortfolioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
